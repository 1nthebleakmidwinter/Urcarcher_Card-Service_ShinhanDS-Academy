from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, GRU, Dense, Dropout, Bidirectional
from tensorflow.keras.optimizers import Adam

class MultiLayeredBidirectionalLSTM(object) :

    def __init__(self, config :dict) -> None :
        self._input_shape = config["input_shape"]
        self._bidirectional_lstm_units = config["bidirectional_lstm_units"]
        self._gru_units = config["gru_units"]
        self._first_dense_output = config["first_dense_output"]
        self._last_dense_output = config["last_dense_output"]
        self._drop_out_ratio = config["drop_out_ratio"]
        self._batch_size = config["batch_size"]
        self._learning_rate = config["learning_rate"]

        self._model = Sequential()

    def buildNN(self) -> Sequential :
        self._model.add(Bidirectional(LSTM(units = self._bidirectional_lstm_units,
                    input_shape = self._input_shape,
                    return_sequences = True
                    )))
        self._model.add(Dropout(self._drop_out_ratio))
        self._model.add(Bidirectional(LSTM(units = self._bidirectional_lstm_units,
                    return_sequences = True
                    )))
        self._model.add(Dropout(self._drop_out_ratio))
        self._model.add(GRU(units = self._gru_units,
                    return_sequences = True
                    ))
        self._model.add(GRU(units = self._gru_units,
                    return_sequences = False
                    ))
        self._model.add(Dense(self._first_dense_output))
        self._model.add(Dropout(self._drop_out_ratio))
        self._model.add(Dense(self._last_dense_output))

        self._model.build(input_shape = self._input_shape)
        self._model.summary()

        optimizer = Adam(learning_rate = self._learning_rate)

        self._model.compile(loss = 'mse', optimizer = optimizer)

        return self._model