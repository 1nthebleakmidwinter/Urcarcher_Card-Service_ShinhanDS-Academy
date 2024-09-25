import numpy as np
import matplotlib.pyplot as plt

from process.models.model_object import MultiLayeredBidirectionalLSTM
from process.database import UrcarcherDBManager
from process.data import DataProcessor
from process.data import get_next_1yr
from process.model_config import COLUMNS
from process.model_config import EXCHANGE_RATE_LIST

class BiLSTMInference(object) :
    def __init__(
            self,
            model_config :dict[str, any]
    ) -> None :
        self._model_config = model_config
        self._model_path = model_config["model_path"]
        self._pred_days = model_config["last_dense_output"]

        self._db_manager = UrcarcherDBManager()

        self._type_dict = {}

        for type in EXCHANGE_RATE_LIST :
            self._type_dict[type] = None

    def _load_model(self, exchange_type :str, column :str) -> MultiLayeredBidirectionalLSTM :
        model = MultiLayeredBidirectionalLSTM(
            self._model_config
        ).buildNN()

        model.load_weights(f"{self._model_path}/BiLSTM_{exchange_type}_{column}.weights.h5")

        return model

    def get_1yr_predict(self) -> str :
        new_data = get_next_1yr()

        for type in EXCHANGE_RATE_LIST :
            for col in COLUMNS[1:5] :
                data_processor = DataProcessor(
                    type,
                    col,
                    1,
                    500,
                    130,
                    300
                )

                model = self._load_model(type, col)

                data_processor.scaling().set_train_test_data()
                scaler = data_processor.get_scaler()

                testX = data_processor.get_data_set_for_predict()

                result = []
                repeat = int(260/130) if 260 % 130 == 0 else int(260/130) + 1
                for _ in range(repeat) :
                    prediction = model.predict(testX)
                    testX = np.array([np.concatenate((testX[0][130:], prediction[0]), axis=0)])
                    result.extend(prediction[0].tolist())

                result = np.array([result[:260]])
                result = result.reshape(260, -1)

                mean_values_pred = np.repeat(scaler.mean_[np.newaxis, :], result.shape[0], axis=0)
                mean_values_pred[:, 0] = np.squeeze(result)
                y_pred = scaler.inverse_transform(mean_values_pred)[:,0]

                new_data[col] = y_pred

            new_data['Change %'] = (new_data['Price'] - new_data["Price"].shift())/new_data["Price"] * 100
            new_data = new_data.fillna(0)

            self._type_dict[type] = new_data.copy()

        print(self._type_dict)

        return "predict success."
    
    def update_db(self) :
        for type in EXCHANGE_RATE_LIST :
            self._db_manager.update_db(self._type_dict[type], type)

        return "db update success."