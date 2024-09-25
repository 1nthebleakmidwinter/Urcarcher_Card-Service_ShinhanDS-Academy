MODEL_CONFIG = {
    "MultiLayeredBidirectionalLSTM" : {
        "input_shape" : (None, 500, 1),
        "bidirectional_lstm_units" : 256,
        "gru_units" : 256,
        "first_dense_output" : 256,
        "last_dense_output" : 130,
        "drop_out_ratio" : 0.2,
        "batch_size" : 256,
        "learning_rate" : 0.0005,
        "model_path" : "/mnt/c/close/shds/urcarcher/urcarcher-ops/airflow/plugins/process/models/weights"
    }
}

EXCHANGE_RATE_LIST = [
    "USD_KRW",
    "JPY_KRW",
    "CNY_KRW"
]

HISTORY_PATH = "/mnt/c/close/shds/urcarcher/urcarcher-ops/airflow/plugins/process/origins"

COLUMNS = ["Date", "Price", "Open", "High", "Low", "Change %"]