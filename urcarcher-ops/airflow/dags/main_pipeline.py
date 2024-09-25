import pendulum
from airflow import DAG
from airflow.operators.empty import EmptyOperator
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator, BranchPythonOperator

from datetime import datetime

from process.data import DataUpdater
from process.model_config import EXCHANGE_RATE_LIST
from process.training import BiLSTMTraining
from process.model_config import MODEL_CONFIG
from process.models.inference import BiLSTMInference

data_updater = DataUpdater(EXCHANGE_RATE_LIST)
bilstm_training = BiLSTMTraining(
    MODEL_CONFIG["MultiLayeredBidirectionalLSTM"]
)
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
    dag_id='main_pipeline',
    default_args=default_args,
    start_date=datetime(2024, 9, 1, tzinfo=kst),
    description='main pipeline',
    schedule_interval='@weekly',
    tags=['main'],
    catchup=False
    ):

    data_update = PythonOperator(
        task_id='data_update',
        python_callable=data_updater.update
    )

    data_save = PythonOperator(
        task_id='data_save',
        python_callable=data_updater.save
    )

    training_by_new_data = PythonOperator(
        task_id='training_by_new_data',
        python_callable=bilstm_training.save_model
    )

    predict = PythonOperator(
        task_id='predict',
        python_callable=bilstm_inference.get_1yr_predict
    )

    update_db = PythonOperator(
        task_id='update_db',
        python_callable=bilstm_inference.update_db
    )

    data_update >> data_save >> training_by_new_data >> predict >> update_db