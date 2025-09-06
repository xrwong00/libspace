#include <esp_now.h>
#include <WiFi.h>

// Define struct to match the transmitter
typedef struct struct_message {
  int sensors[6];  // sensor states
} struct_message;

struct_message incomingData;

// Callback when data is received
void OnDataRecv(const uint8_t * mac, const uint8_t *incomingDataRaw, int len) {
  memcpy(&incomingData, incomingDataRaw, sizeof(incomingData));

  // Print MAC address of sender (to identify which client)
  char macStr[18];
  snprintf(macStr, sizeof(macStr), "%02X:%02X:%02X:%02X:%02X:%02X",
           mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);

  // Print to Serial (UART to Raspberry Pi)
  Serial.print("From ");
  Serial.print(macStr);
  Serial.print(" | Data: ");

  // Print sensor values
  for (int i = 0; i < 6; i++) {
    Serial.print(incomingData.sensors[i]);
  }
  Serial.println();
}

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);

  // Init ESP-NOW
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }

  // Register for receive callback
  esp_now_register_recv_cb(OnDataRecv);
}

// void loop() {
// }