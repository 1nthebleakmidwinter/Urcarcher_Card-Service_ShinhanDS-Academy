import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime
import time
import pymysql
from datetime import datetime
from urllib.parse import urlparse, parse_qs
import requests  # 추가된 부분
import openai
# 카카오 API 키 설정
API_KEY = # 여기에 카카오 REST API 키를 입력하세요.
openai.api_key = # 여기에 openai API 키를 입력하세요.
chrome_options = Options()
chrome_options.add_experimental_option("detach", True)

driver = webdriver.Chrome(options=chrome_options)

def generate_description_with_style_and_politeness(place_name, example_text, min_length, max_length):
    prompt = f"'{example_text}'와 같은 스타일로, 존댓말을 사용하여 '{place_name}'에 대한 설명을 작성해 주세요. 설명은 {min_length}자에서 {max_length}자 사이여야 합니다."

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=max_length * 2
    )

    description = response.choices[0].message['content'].strip()

    # 설명이 너무 길면, 마지막 온전한 문장까지 자르기
    if len(description) > max_length:
        cut_off_index = description[:max_length].rfind('.')
        if cut_off_index != -1:
            description = description[:cut_off_index + 1]
        else:
            description = description[:max_length].rstrip() + "."

    # 설명이 너무 짧으면, 추가 문장을 생성하여 붙이기
    while len(description) < min_length:
        additional_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"{description}에 대해 조금 더 설명해 주세요."}
            ],
            max_tokens=(max_length - len(description)) * 2
        )
        additional_text = additional_response.choices[0].message['content'].strip()

        description += " " + additional_text
        description = description.strip()

        if len(description) > max_length:
            cut_off_index = description[:max_length].rfind('.')
            if cut_off_index != -1:
                description = description[:cut_off_index + 1]
            break

    return description

def get_place_description(place_name):
    # 예시 문장
    example_text = "청사포의 다릿돌 전망대는 청사포 마을을 상징하는 푸른 용을 형상화해 독특한 곡선의 형태로 만들어졌다. ‘다릿돌’은 청사포 해안에서 해상 등대까지 가지런히 늘어선 다섯 암초가 마치 징검다리 같다고 하여 붙여진 이름이다. 투명 바닥을 통해 바다 위를 걷는 짜릿함을 맛볼 수 있는데, 유리에 흠이 나지 않도록 안내소 입구에서 덧신을 신고 입장한다. 전망대 끝에는 망원경이 있어 바다 전망을 더욱 실감나게 즐길 수 있다."

    # 짧은 설명 요청 (100자 이상 150자 이하)
    short_description = generate_description_with_style_and_politeness(place_name, example_text, 70, 100)

    # 긴 설명 요청 (400자 이상 450자 이하)
    long_description = generate_description_with_style_and_politeness(place_name, example_text, 200, 250)

    return short_description, long_description

def get_lat_lng(address):
    url = "https://dapi.kakao.com/v2/local/search/address.json"
    headers = {
        "Authorization": f"KakaoAK {API_KEY}"
    }
    params = {"query": address}

    response = requests.get(url, headers=headers, params=params)
    data = response.json()

    # 전체 응답 데이터를 출력하여 디버깅
    print(f"API response for address '{address}': {data}")

    if 'documents' in data and data['documents']:
        location = data['documents'][0]['address']
        lat = location['y']
        lng = location['x']
        print("위도:", lat, "경도:", lng)
        return lat, lng
    else:
        # 응답에 documents가 없거나 비어있는 경우 오류 메시지 출력
        print(f"Failed to retrieve coordinates for address: {address}")
        return None, None


def save_to_database(courseId, courseName, region, placeImgs, placeNames, placeAddress):
    try:
        # 데이터베이스 연결
        conn = pymysql.connect(
            host='',
            port=3306,
            user='root',
            password='',
            db='',
            charset='utf8mb4'
        )
        cursor = conn.cursor()

        # 현재 날짜를 가져옵니다.
        current_date = datetime.now().strftime('%Y-%m-%d')

        # travel_course 테이블에 삽입
        insert_travel_course_query = """
            INSERT INTO course_category (course_id, course_count, course_name, point_amount, region, course_img, view_count, register_date, auth_count)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        # course_img는 placeImgs의 첫 번째 이미지 사용
        cursor.execute(insert_travel_course_query, (
            courseId,
            len(placeNames),
            courseName,
            100,
            region,
            placeImgs[0] if placeImgs else None,
            0,
            current_date,  # 현재 날짜를 사용
            0
        ))

        for idx, (name, address, img) in enumerate(zip(placeNames, placeAddress, placeImgs)):
            place_id = f"{courseId}-{idx + 1}"


            lat, lng = get_lat_lng(address)

            if lat and lng:
                short_desc, long_desc = get_place_description(name)


                insert_place_query = """
                    INSERT INTO travel_course (place_id, course_id, address, content, detail_content, latitude, longitude, place_img, place_name)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(insert_place_query, (
                    place_id,
                    courseId,
                    address,
                    short_desc,
                    long_desc,
                    lat,
                    lng,
                    img,
                    name
                ))


        conn.commit()

    except Exception as e:
        print(f"An error occurred while saving data to the database: {e}")
    finally:
        cursor.close()
        conn.close()


def wait_for_ajax(driver):
    WebDriverWait(driver, 30).until(
        lambda d: d.execute_script('return jQuery.active == 0')
    )


def get_course_info(driver):
    try:
        # AJAX 요청 대기
        wait_for_ajax(driver)

        time.sleep(3)

        # 현재 URL 가져오기
        current_url = driver.current_url
        parsed_url = urlparse(current_url)
        query_params = parse_qs(parsed_url.query)


        cotid = query_params.get("cotid", [""])[0]

        short_cotid = cotid[:8]

        # courseId 생성
        courseId = f"{short_cotid}"

        # courseName 추출
        courseName_element = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div.tit h2"))
        )
        full_text = courseName_element.text

        em_text = courseName_element.find_element(By.CSS_SELECTOR, "em.tit_cos").text
        courseName = full_text.replace(em_text, "").strip()

        region_element = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "span.address"))
        )
        region_full = region_element.text
        region = region_full[:2]  # 앞 두 글자만 추출

        # cosTab 요소들을 가져오기
        cos_tabs = driver.find_elements(By.CSS_SELECTOR, '[id^=cosTab]')

        placeNames = []
        placeAddress = []
        placeImgs = []
        for index, cos_tab in enumerate(cos_tabs):
            try:
                # 현재 탭을 active로 설정
                driver.execute_script("arguments[0].classList.add('active');", cos_tab)

                # a 태그 선택 후 텍스트 추출
                a_tag = cos_tab.find_element(By.CSS_SELECTOR, 'strong > a')
                link_text = a_tag.text.strip()
                if link_text:
                    placeNames.append(link_text)

                span_tags = cos_tab.find_elements(By.CSS_SELECTOR, 'div.title > span')
                if span_tags:
                    address = span_tags[0].text.strip()
                    if address:
                        placeAddress.append(address)

                first_a_tag = cos_tab.find_element(By.CSS_SELECTOR, 'div.wrap > div > a')
                style_attr = first_a_tag.get_attribute('style')
                start_index = style_attr.find('url(') + 4
                end_index = style_attr.find(')', start_index)
                image_url = style_attr[start_index:end_index]

                if image_url:
                    placeImgs.append(image_url)

                # 현재 탭을 비활성화
                driver.execute_script("arguments[0].classList.remove('active');", cos_tab)

            except Exception as e:
                print(f"Error extracting link text: {e}")
                continue

        # 추출된 정보를 데이터베이스에 저장
        save_to_database(courseId, courseName, region, placeImgs, placeNames, placeAddress)

        return courseName, region, placeNames, placeAddress, placeImgs

    except Exception as e:
        print(f"An error occurred: {e}")
        return None, None, [], [], []


def scrape_details():
    courseName, region, placeNames, placeAddress, placeImgs = get_course_info(driver)
    if courseName is None:
        return


def scrape_all_details():
    WebDriverWait(driver, 20).until(
        lambda driver: driver.execute_script("return document.readyState") == "complete"
    )

    while True:
        distances = driver.find_elements(By.CSS_SELECTOR, "span.distance")
        print(f"Found {len(distances)} distance elements.")

        for index in range(len(distances)):
            try:
                # distances 요소를 새로 가져오기
                distances = driver.find_elements(By.CSS_SELECTOR, "span.distance")

                if not distances:
                    print("No distance elements found on the page.")
                    break

                print(f"Clicking on distance element {index + 1}")
                distances[index].click()

                # 페이지가 완전히 로드될 때까지 추가 대기
                WebDriverWait(driver, 20).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "div.tit h2"))
                )

                scrape_details()

                # 이전 페이지로 돌아가기
                driver.back()

                # 페이지가 돌아온 후 완전히 로드될 때까지 대기
                WebDriverWait(driver, 20).until(
                    lambda driver: driver.execute_script("return document.readyState") == "complete"
                )

                # 이전 페이지로 돌아온 후 distances 요소가 다시 로드될 때까지 대기
                time.sleep(2)

            except Exception as e:
                print(f"Error occurred during scraping detail page {index + 1}: {e}")

        # 다음 페이지로 이동
        try:

            WebDriverWait(driver, 20).until(
                lambda driver: driver.execute_script("return document.readyState") == "complete"
            )


            next_button = driver.find_element(By.CSS_SELECTOR, "a.btn_next.ico")
            if "disabled" in next_button.get_attribute("class"):
                print("No more pages to navigate.")
                break
            else:
                print("Moving to the next page.")
                next_button.click()

                # 다음 페이지가 로드될 때까지 대기
                WebDriverWait(driver, 20).until(
                    lambda driver: driver.execute_script("return document.readyState") == "complete"
                )

        except Exception as e:
            print("No more pages or an error occurred:", e)
            break


try:
    driver.get("https://korean.visitkorea.or.kr/list/travelinfo.do?service=cs")

    WebDriverWait(driver, 20).until(
        lambda driver: driver.execute_script("return document.readyState") == "complete"
    )

    # 서울 버튼 클릭
    seoul_button = WebDriverWait(driver, 20).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "#\\34  > button > span"))
    )
    seoul_button.click()

    WebDriverWait(driver, 20).until(
        lambda driver: driver.execute_script("return document.readyState") == "complete"
    )

    scrape_all_details()

except Exception as e:
    print(f"An error occurred: {e}")

finally:
    pass
