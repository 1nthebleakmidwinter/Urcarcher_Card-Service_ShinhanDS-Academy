from process.models.model_object import MultiLayeredBidirectionalLSTM
from process.data import DataProcessor

from process.model_config import COLUMNS
from process.model_config import EXCHANGE_RATE_LIST

class BiLSTMTraining(object) :
    def __init__(
            self,
            model_config :dict[str, any]
    ) -> None :
        self._model_config = model_config
        self._model_path = model_config["model_path"]

        self._type_dict = {}

        for type in EXCHANGE_RATE_LIST :
            self._type_dict[type] = None

    def _load_model(self) -> MultiLayeredBidirectionalLSTM :
        model = MultiLayeredBidirectionalLSTM(
            self._model_config
        ).buildNN()

        return model
    
    def save_model(self) -> str :
        for type in EXCHANGE_RATE_LIST :
            for col in COLUMNS :
                data_processor = DataProcessor(
                    type,
                    col,
                    1,
                    500,
                    130,
                    300
                )

                trainX, trainY, _, _ = data_processor.get_data_set_by_sliding_window()
                model = self._load_model()
                _ = model.fit(trainX, trainY, epochs=500, batch_size=256,
                                    validation_split=0.1, verbose=1)
                model.save_weights(f"{self._model_path}/BiLSTM_{type}_{col}.weights.h5")

        return "model save success."