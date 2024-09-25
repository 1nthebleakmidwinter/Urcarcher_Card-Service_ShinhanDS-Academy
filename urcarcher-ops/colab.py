# !pip install numpy
# !pip install pandas
# !pip install tensorflow==2.15.1
# !pip install keras==2.15.0
# !pip install scikit-learn
# !pip install matplotlib

import numpy as np
import pandas as pd
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, GRU, Dense, Flatten, Dropout, Bidirectional
from tensorflow.keras.optimizers import Adam
from keras.callbacks import EarlyStopping
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

TRAIN_PATH = "drive/MyDrive/urcarcher-ml"
# TRAIN_TARGET = "USD_KRW"
# TRAIN_TARGET = "JPY_KRW"
TRAIN_TARGET = "CNY_KRW"
COLUMNS = ["Date", "Price", "Open", "High", "Low", "Change %"]
COLUMNS_MATCHING = {"Price":0, "Open":1, "High":2, "Low":3}

PREDICT_TARGET = "Low"

exchange_rate_data = pd.read_csv(f"{TRAIN_PATH}/{TRAIN_TARGET}.csv")

y = exchange_rate_data[PREDICT_TARGET].values

dates = pd.to_datetime(exchange_rate_data["Date"])

exchange_rate_data = exchange_rate_data[COLUMNS[1:]].astype(float)

scaler = StandardScaler()
scaler = scaler.fit(exchange_rate_data)
exchange_rate_data_scaled = scaler.transform(exchange_rate_data)

# n_train = int(0.95 * exchange_rate_data_scaled.shape[0])
n_train = exchange_rate_data_scaled.shape[0]
train_data_scaled = exchange_rate_data_scaled[:n_train]
train_dates = dates[:n_train]

test_data_scaled = exchange_rate_data_scaled[n_train:]
test_dates = dates[n_train:]

# pred_days = 1
# seq_len = 14
# window = 1

# pred_days = 30
# seq_len = 100
# window = 7

# pred_days = 260
# seq_len = 1300
# window = 1300

pred_days = 130
seq_len = 500
window = 300

input_dim = 1

trainX, trainY = [], []

# for i in range(seq_len, n_train-pred_days):
#     trainX.append(train_data_scaled[i-seq_len:i, 0:train_data_scaled.shape[1]])
#     trainY.append(train_data_scaled[i:i+pred_days, 0])

# for i in range(seq_len, len(test_data_scaled)-pred_days+1) :
#     testX.append(test_data_scaled[i-seq_len:i, 0:test_data_scaled.shape[1]])
#     testY.append(test_data_scaled[i:i+pred_days, 0])

for i in range(seq_len, n_train-pred_days, window):
    trainX.append(train_data_scaled[i-seq_len:i, COLUMNS_MATCHING[PREDICT_TARGET]])
    trainY.append(train_data_scaled[i:i+pred_days, COLUMNS_MATCHING[PREDICT_TARGET]])

trainX, trainY = np.array(trainX), np.array(trainY)
early_stop = EarlyStopping(monitor='loss', patience=20, verbose=1)

# input_shape = (trainX.shape[1], trainX.shape[2])
input_shape = (seq_len, 1)

MODEL_NAME = "BiLSTM"
WEIGHTS_USING = f'{TRAIN_PATH}/weights/{MODEL_NAME}_p{pred_days}_s{seq_len}_d{input_dim}_{TRAIN_TARGET}_{PREDICT_TARGET}.weights.h5'

# GRU V
# model = Sequential()
# model.add(GRU(units = 16, 
#                input_shape = input_shape, 
#                return_sequences = True,
#                activation = 'relu'))
# model.add(GRU(units = 8,
#               return_sequences = False,
#               activation = 'relu'))
# model.add(Dense(trainY.shape[1]))

# BiLSTM 30
# model = Sequential()
# model.add(Bidirectional(LSTM(units = 32,
#               return_sequences = False,
#               )))
# model.add(Dense(trainY.shape[1]))

# BiLSTM 1300 260
# model = Sequential()
# model.add(Bidirectional(LSTM(units = 512,
#                input_shape = input_shape,
#                return_sequences = True,
#                )))
# model.add(Dropout(0.4))
# model.add(Bidirectional(LSTM(units = 512,
#                return_sequences = True,
#                )))
# model.add(Dropout(0.4))
# model.add(GRU(units = 256,
#                return_sequences = True
#                ))
# model.add(GRU(units = 256,
#                return_sequences = False
#                ))
# model.add(Dense(256))
# model.add(Dropout(0.4))
# model.add(Dense(trainY.shape[1]))

# BiLSTM 500 130
model = Sequential()
model.add(Bidirectional(LSTM(units = 256,
               input_shape = input_shape,
               return_sequences = True,
               )))
model.add(Dropout(0.2))
model.add(Bidirectional(LSTM(units = 256,
               return_sequences = True,
               )))
model.add(Dropout(0.2))
model.add(GRU(units = 256,
               return_sequences = True
               ))
model.add(GRU(units = 256,
               return_sequences = False
               ))
model.add(Dense(256))
model.add(Dropout(0.2))
model.add(Dense(trainY.shape[1]))






# model.build(input_shape = trainX.shape)
model.build(input_shape = (None, seq_len, 1))

model.summary()

learning_rate = 0.0005

optimizer = Adam(learning_rate = learning_rate)

model.compile(loss = 'mse', optimizer = optimizer)

try:
    model.load_weights(WEIGHTS_USING)
    print("Loaded model weights from disk")
except Exception as e:
    print(e)
    print("No weights found, training model from scratch")

    history = model.fit(trainX, trainY, epochs=500, batch_size=256,
                    validation_split=0.1, verbose=1)

    model.save_weights(WEIGHTS_USING)

    plt.plot(history.history['loss'], label='Training loss')
    plt.plot(history.history['val_loss'], label='Validation loss')
    plt.legend()
    plt.show()

# testX = []
# testX.append(train_data_scaled[n_train-seq_len:n_train, COLUMNS_MATCHING[PREDICT_TARGET]])
# testX = np.array(testX)

# prediction = model.predict(testX)
# prediction = prediction.reshape(pred_days, -1)
# mean_values_pred = np.repeat(scaler.mean_[np.newaxis, :], prediction.shape[0], axis=0)
# mean_values_pred[:, 0] = np.squeeze(prediction)
# y_pred = scaler.inverse_transform(mean_values_pred)[:,0]

# plt.plot(y_pred[:],
#          color='red',
#          linestyle='--',
#          label='Predicted Open Price')

# plt.show()



testX = []
testX.append(train_data_scaled[n_train-seq_len:n_train, COLUMNS_MATCHING[PREDICT_TARGET]])
testX = np.array(testX)
result = []
repeat = int(260/pred_days) if 260 % pred_days == 0 else int(260/pred_days) + 1
for _ in range(repeat) :
    prediction = model.predict(testX)
    testX = np.array([np.concatenate((testX[0][pred_days:], prediction[0]), axis=0)])
    result.extend(prediction[0].tolist())

result = np.array([result[:260]])
result = result.reshape(260, -1)

mean_values_pred = np.repeat(scaler.mean_[np.newaxis, :], result.shape[0], axis=0)
mean_values_pred[:, 0] = np.squeeze(result)
y_pred = scaler.inverse_transform(mean_values_pred)[:,0]
print(y_pred)
plt.plot(y_pred[:],
         color='red',
         linestyle='--',
         label='Predicted Open Price')

plt.show()




# testX, testY = [], []
# testX.append(train_data_scaled[n_train-seq_len:n_train, COLUMNS_MATCHING[PREDICT_TARGET]])
# testY.append(test_data_scaled[:260, COLUMNS_MATCHING[PREDICT_TARGET]])
# testX, testY = np.array(testX), np.array(testY)
# result = []
# repeat = int(260/pred_days) if 260 % pred_days == 0 else int(260/pred_days) + 1
# for _ in range(repeat) :
#     prediction = model.predict(testX)
#     testX = np.array([np.concatenate((testX[0][pred_days:], prediction[0]), axis=0)])
#     result.extend(prediction[0].tolist())

# result = np.array([result[:260]])
# result = result.reshape(260, -1)
# testY = testY.reshape(260, -1)

# mean_values_pred = np.repeat(scaler.mean_[np.newaxis, :], result.shape[0], axis=0)
# mean_values_pred[:, 0] = np.squeeze(result)
# y_pred = scaler.inverse_transform(mean_values_pred)[:,0]
# mean_values_testY = np.repeat(scaler.mean_[np.newaxis, :], testY.shape[0], axis=0)

# mean_values_testY[:, 0] = np.squeeze(testY)

# testY_original = scaler.inverse_transform(mean_values_testY)[:,0]

# plt.plot(test_dates[:260],
#          testY_original[:],
#          color='blue',
#          label='Actual')

# plt.plot(test_dates[:260],
#          y_pred[:],
#          color='red',
#          linestyle='--',
#          label='Predicted')

# plt.xlabel('Date')
# plt.ylabel(TRAIN_TARGET)
# plt.legend()
# plt.show()





# testX, testY = [], []
# testX.append(train_data_scaled[n_train-seq_len:n_train, COLUMNS_MATCHING[PREDICT_TARGET]])
# testY.append(test_data_scaled[:pred_days, COLUMNS_MATCHING[PREDICT_TARGET]])

# testX, testY = np.array(testX), np.array(testY)

# prediction = model.predict(testX)

# prediction = prediction.reshape(pred_days, -1)
# testY = testY.reshape(pred_days, -1)

# mean_values_pred = np.repeat(scaler.mean_[np.newaxis, :], prediction.shape[0], axis=0)
# mean_values_pred[:, 0] = np.squeeze(prediction)
# y_pred = scaler.inverse_transform(mean_values_pred)[:,0]
# mean_values_testY = np.repeat(scaler.mean_[np.newaxis, :], testY.shape[0], axis=0)

# mean_values_testY[:, 0] = np.squeeze(testY)

# testY_original = scaler.inverse_transform(mean_values_testY)[:,0]

# plt.plot(test_dates[:pred_days],
#          testY_original[:],
#          color='blue',
#          label='Actual')

# plt.plot(test_dates[:pred_days],
#          y_pred[:],
#          color='red',
#          linestyle='--',
#          label='Predicted')

# plt.show()