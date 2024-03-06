<div align="center">
  
# Smart Home Management Platform

  <p align="center">
    <i>Project done for an engineering thesis</i> <br/>
    Lublin University of Technology <br/>
    Faculty of Electrical Engineering and Computer Science <br/>
    Department of Electrical Engineering and Intelligent Technologies
    <br />
  </p>
</div>


## About The Project

**Thesis title:** <i>Design and implementation of a smart home management platform</i> <br/>
The main goal of the project is to develop a comprehensive and user-friendly smart home management platform, offering seamless control and automation of various interconnected devices within a domestic environment. The project assumes creation of a low-budget model using a set of sensors and actuators simulating the operation of real home devices. In addition to the electronic model, the scope of work includes the entire ecosystem based on the Raspberry PI microcomputer, responsible for collecting, processing and displaying data to the user and enabling remote control of automation systems using an cross-platform application.


## Features
- Home arming function - turning on the motion sensor and detecting intrusions
- Sending notifications when an intrusion is detected
- Measuring temperature and humidity in a room and presenting the collected data in the form of graphs
- Remote control of the servo mechanism representing automatic blinds
- RGB lighting with the ability to set any color and brightness from the application
- Various lighting scenes
- Displaying current and forecast weather data based on the weather api


| App dark themed  | App light themed |
| ------------- | ------------- |
| ![App dark theme)] | ![App light theme)

# Table of contents
- [Part list](#part-list)
- [Hardware Architecture](#hardware-architecture)
- [Software Architecture](#software-architecture)
- [Used Technologies](#used-technologies)
- [Storing data and managing states](#storing-data-and-managing-states)
- [Network Communication](#network-communication)
- [Setup the Raspberry Pi](#setup-the-raspberry-pi)
- [Expansion Possibilities](#expansion-possibilities)


<a name="part-list"></a>
## Part list

| Name  | Anmount | Description |
| ------------- | ------------- | ------------- |
| Raspberry Pi 4 model B | 1 | Microcomputer |
| JustPi LT-4B03 | 1 | Cooling case for Raspberry Pi 4B  |
| JustPi USB C 5V/3A  | 1 | Power supply for Raspberry Pi 4B  |
| DHT11 | 1 | Temperature and humidity sensor |
| Active buzzer 5V 12mm | 1 | Small sound generator |
| PIR HC-SR501 | 1 | Motion sensor  |
| MicroSerwo SG-90 | 1 | Precisely controlled rotation mechanism |
| MB102 Power supply | 1 | Power supply module for the breadboard |
| JustPi - 830 breadboard | 1 | Tool used to build circuits without soldering |
| RGB LED diode, co-cathode | 2 | - |
| Resistor 220 Ω  | 6 | - |
| Resistor 1 kΩ  | 1 | - |

<a name="hardware-architecture"></a>
## Hardware Architecture
![scheme](https://github.com/MKaczmarski07/smart-home/assets/95142305/2ee7998b-72b5-4f0a-9d51-e58bad7c0bf3)
<i>Some components must be directly grounded to the raspberry pi to work properly. However, it is not recommended to power components such as motors directly from the board pins, because too high current may damage the pin or the computer.</i> <br/>


<a name="software-architecture"></a>
## Software Architecture
![software architecture](https://github.com/MKaczmarski07/smart-home/assets/95142305/bd87a263-d2e2-4960-9b6a-05c58f83a1b8)


<a name="used-technologies"></a>
## Used Technologies

### Programming Languages
[TypeScript 🔗](https://typescriptlang.org)<br>
[Python 3 🔗](https://www.python.org)<br>

### Frameworks & Extensions
[Ionic 🔗](https://ionicframework.com)<br>
[Angular 17 🔗](https://angular.dev)<br>
[Sass 🔗](https://sass-lang.com)<br>
[Flask 🔗](https://flask.palletsprojects.com/en/3.0.x/)<br>

### Libraries
[Iro.Js 🔗](https://iro.js.org)<br>
[Flask CORS 🔗](https://flask-cors.readthedocs.io/en/latest/)<br>
[Adafruit CircuitPython DHT 🔗](https://docs.circuitpython.org/projects/dht/en/latest/)<br>

### Databases
[SQLite 🔗](https://www.sqlite.org)<br>

<!-- 
[Docker 🔗]()<br>
Node.js min v18.13 !!!
[🔗]()<br>
… -->

<a name="database"></a>
## Storing data and managing states
All states and attributes are stored in the database in a table named states. Every IoT device is represented by a unique address.

| Field  | Type |
| ------------- | ------------- |
| id | INTEGER PRIMARY KEY |
| adress | TEXT UNIQUE |
| state | TEXT |
| attributes | TEXT |

<a name="network"></a>
## Network Communication
Communication between the user's application and the server ( Raspberry PI ) takes place in the local network ( LAN ). This is a common solution used in IoT systems. Local network ensures reliable and secure communication. Devices can communicate with each other without the need for an internet connection and unauthorized access is more difficult. <br/>

Remote communication with the system via the Internet is also possible, e.g. by port forwarding. However, this solution requires an additional layer of security, including user authentication and protection against various types of external attacks.

<a name="raspi"></a>
## Setup the Raspberry Pi

### First steps
The first step is to upload the Raspberry  Pi OS image to the SD card. This can be easily done using the [Raspberry Pi Imager](https://www.raspberrypi.com/software/) tool available on the official website.

After installing the system and initial configuration, you can connect to the microcomputer wirelessly using SSH. In the terminal on your computer, enter:

```
  ssh username@ipAddress
  password
```
Where the first part corresponds to the user account, and the second part is the IP address of the raspberry in the local network. The default user is "pi" and the default password is "raspberry".

### Safe shutdown
The raspberrypi microcomputer should not be turned off by immediately disconnecting the power supply, as this may damage the system or the SD card. To safely turn off your device, in the raspberry terminal, enter
```
  sudo shutdown -h now
```
And wait until the green LED on the raspberry stops blinking

<a name="expansion-possibilities"></a>
## Expansion Possibilities
- Due to the availability of funds, the project uses a wired connection to sensors and actuators, directly to the GPIO ports. In a full-scale home system, communication could take place wirelessly, e.g. via the ZigBee protocol or Bluetooth.
- RGB LEDs can be replaced with a regular light bulb or an RGB bulb powered by the power grid. Such a bulb can be controlled using a relay that connects to the system wirelessly using a micro-controller such as ESP8266.

