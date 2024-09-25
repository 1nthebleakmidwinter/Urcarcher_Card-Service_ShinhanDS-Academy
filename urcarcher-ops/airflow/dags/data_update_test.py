import pendulum
from airflow import DAG
from airflow.operators.empty import EmptyOperator
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator, BranchPythonOperator

from datetime import datetime

from process.data import DataUpdater
from process.model_config import EXCHANGE_RATE_LIST

data_updater = DataUpdater(EXCHANGE_RATE_LIST)

kst = pendulum.timezone("Asia/Seoul")

default_args = {
    'owner' : 'Jaehwan Lee.',
    'email' : ['1nth2bleakmidwinter@gmail.com'],
    'email_on_failure': False
}    

with DAG(
    dag_id='data_update_test',
    default_args=default_args,
    start_date=datetime(2024, 9, 1, tzinfo=kst),
    description='data update test',
    schedule_interval='@once',
    tags=['data update test'],
    catchup=False
    ):

    t1 = PythonOperator(
        task_id='data_update_test',
        python_callable=data_updater.update
    )

    t1