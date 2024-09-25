from process.data import DataUpdater
from process.model_config import EXCHANGE_RATE_LIST
from process.models.inference import BiLSTMInference
from process.model_config import MODEL_CONFIG

# data_updater = DataUpdater(EXCHANGE_RATE_LIST)

# data_updater.update()
# data_updater.save()



# bilstm_inference = BiLSTMInference(
#     MODEL_CONFIG["MultiLayeredBidirectionalLSTM"]
# )

# bilstm_inference.get_1yr_predict()
# bilstm_inference.update_db()