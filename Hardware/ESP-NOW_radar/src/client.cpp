#include <esp_now.h>
#include <WiFi.h>

// replace receiver mac address
// For broadcast, use all FF
uint8_t broadcastAddress[] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF};

// Define pins for 6 RCWL-0516 sensors
#define SENSOR1 32
#define SENSOR2 33
#define SENSOR3 25
#define SENSOR4 26
#define SENSOR5 27
#define SENSOR6 14


typedef struct struct_message {
  int sensors[6];
} struct_message;

struct_message myData;

esp_now_peer_info_t peerInfo;

// callback when data is sent
void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {
  Serial.print("\r\nLast Packet Send Status:\t");
  Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Delivery Success" : "Delivery Fail");
}

void setup() {
  // Init Serial Monitor
  Serial.begin(115200);

  // Set device as a Wi-Fi Station
  WiFi.mode(WIFI_STA);

  // Init ESP-NOW
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }

  // Register send callback
  esp_now_register_send_cb(OnDataSent);

  // Register peer
  memcpy(peerInfo.peer_addr, broadcastAddress, 6);
  peerInfo.channel = 0;
  peerInfo.encrypt = false;

  if (esp_now_add_peer(&peerInfo) != ESP_OK) {
    Serial.println("Failed to add peer");
    return;
  }

  // Set sensor pins as inputs
  pinMode(SENSOR1, INPUT);
  pinMode(SENSOR2, INPUT);
  pinMode(SENSOR3, INPUT);
  pinMode(SENSOR4, INPUT);
  pinMode(SENSOR5, INPUT);
  pinMode(SENSOR6, INPUT);
}

void loop() {
  // Read sensor states
  myData.sensors[0] = digitalRead(SENSOR1);
  myData.sensors[1] = digitalRead(SENSOR2);
  myData.sensors[2] = digitalRead(SENSOR3);
  myData.sensors[3] = digitalRead(SENSOR4);
  myData.sensors[4] = digitalRead(SENSOR5);
  myData.sensors[5] = digitalRead(SENSOR6);

  // Send message via ESP-NOW
  esp_err_t result = esp_now_send(broadcastAddress, (uint8_t *) &myData, sizeof(myData));

  if (result == ESP_OK) {
    Serial.print("Sent: ");
    for (int i = 0; i < 6; i++) {
      Serial.print(myData.sensors[i]);
      Serial.print(" ");
    }
    Serial.println();
  }
  else {
    Serial.println("Error sending the data");
  }

  delay(500);
}
