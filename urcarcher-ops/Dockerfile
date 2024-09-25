FROM python:3.8.15-slim-buster
WORKDIR /app
RUN apt-get -y update && \
    apt -y install wget && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt -y install ./google-chrome-stable_current_amd64.deb

COPY . /app

EXPOSE 8000

ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

RUN pip3 install -r requirements.txt

CMD ["python3", "-m", "src.main"]