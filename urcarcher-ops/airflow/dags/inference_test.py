import pendulum
from airflow import DAG
from airflow.operators.empty import EmptyOperator
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator, BranchPythonOperator

from datetime import datetime

from process.model_config import MODEL_CONFIG
from process.models.inference import BiLSTMInference

bilstm_inference = BiLSTMInference(
    MODEL_CONFIG["MultiLayeredBidirectionalLSTM"]
)

kst = pendulum.timezone("Asia/Seoul")

default_args = {
    'owner' : 'Jaehwan Lee.',
    'email' : ['1nth2bleakmidwinter@gmail.com'],
    'email_on_failure': False
}    

with DAG(
    dag_id='inference_test',
    default_args=default_args,
    start_date=datetime(2024, 9, 1, tzinfo=kst),
    description='inference test',
    schedule_interval='@once',
    tags=['inference test'],
    catchup=False
    ):

    t1 = PythonOperator(
        task_id='inference_test',
        python_callable=bilstm_inference.get_1yr_predict
    )

    t1