
# About The Project
<i>This project was developed as part of my Engineering Thesis defended in 2025 at Lublin University of Technology, Faculty of Electrical Engineering and Computer Science, Department of Electrical Engineering and Intelligent Technologies.</i>

### Main Concepts and Learning Objectives
- The primary objective was to explore the fundamental components of modern smart buildings and develop a simple system in real life using available resources. <br/>
- Apart from my theoretical research on the subject, I built a Raspberry Pi-based system that enables remote control of sensors and actuators via a mobile application. <br/>
- The communication between user interface and hardware components is achieved with client-server model utilizing HTTP protocol and REST API. <br/>
- A web server hosted on the Raspberry Pi executes Python scripts to manage GPIO pins and establish connectivity with the external world <br/>

### Used Technologies
[![My Skills](https://skillicons.dev/icons?i=python,raspberrypi,ubuntu,flask,typescript,angular,sass,sqlite)](https://skillicons.dev)

### System Features
🛡️ Controlling the operation of the motion sensor and detecting intrusions. </br>
🔔 Sending notifications and turning on the alarm when an intrusion is detected, with the option of turning off each of these functions. </br>
📈 Measuring current temperature and humidity in a room and displaying data in the application. </br>
⚙️ Remote control of the servo mechanism representing automatic blinds. </br>
💡 RGB lighting with the ability to set any color and brightness from the application. </br>
🌈 Various lighting scenes. </br>
🌦️ Displaying current weather data based on the API calls. </br>


# Table of contents
1. [Hardware Components](#hardware-components)
2. [Hardware Architecture](#hardware-architecture)
3. [Software Architecture](#software-architecture)
4. [Full list of software technologies](#used-technologies)
5. [Network Communication](#network)
6. [Mobile Application](#ionic)
7. [Setup the Raspberry Pi](#setup-the-raspberry-pi)
8. [Setup Flask Web Server](#setup-flask)
9. [Expansion Possibilities](#expansion-possibilities)

<a name="hardware-components"></a>
# Hardware Components

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

# Hardware Architecture
![scheme](https://github.com/user-attachments/assets/979696b2-025e-485b-8386-d008075ac5f7)

> [!CAUTION]
> NEVER connect LEDs up to the GPIO pins without a resistor. The Raspberry Pi GPIO pins can only supply a small current (about 60mA). The LEDs will want to draw more, and if allowed to they may damage your Raspberry Pi or the pins used.

> [!WARNING]
> Low-current components like sensors and Buzzers / LEDs should be grounded directly to the Raspberry Pi to avoid incorrect current flow. However, it is not recommended to power and ground high-current components such as motors directly from the board pins, as too high current may permamently damage the pins or the Raspberry Pi itself.

<a name="software-architecture"></a>
# Software Architecture
![software architecture](https://github.com/MKaczmarski07/smart-home/assets/95142305/5c28e503-e384-4ae9-9a3b-06f5e70e3058)

<a name="used-technologies"></a>
# Full list of software technologies

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

<a name="network"></a>
# Network Communication
Communication between the user's application and the server (Raspberry PI) takes place in the local network (LAN). Local network ensures reliable and secure communication, as devices can communicate with each other without the need for an internet connection.<br/>

Remote communication with the system via the Internet is also possible, e.g. by port forwarding configured on the router. However, this solution requires an additional layer of security, including user authentication and protection against various types of malicious behaviors.

<a name="ionic"></a>
# Mobile Application

### User Interface
![Mockup](https://github.com/user-attachments/assets/be52269e-f8ee-4582-b493-0c3fa09b6f28)

### Core Architecture
For this project, I decided to use Angular 17 as the main framework with the modular architecture. The Angular based web application can be compiled into native-like mobile application using Ionic Framework & Capacitor runtime. Ionic itself is not only allowing for cross-platform development, but also provides a collection of customisable UI Components and building tools.</br>

Breaking the application into modules allows for significant reduction of loading time. Additionally, main routing strategy uses [Ionic tabs](https://ionicframework.com/docs/api/tabs) architecture, which also increases performance of the native application.

### Ionic Setup Guide
Before you begin, make sure you have the following installed on your machine:

- Node.js (version 18.13 or later) 
- npm package manager (version 9.0 or later)

To install all required dependencies, move to the app main workspace (frontend folder) and run:

    npm i

To create a localhost port type:

    ionic serve

Your application is ready at port 8100.

    http://localhost:8100/

# <a name="raspi"></a>
# Setup the Raspberry Pi

### First steps
The first step is to upload the Raspberry Pi OS image to the SD card. This can be easily done using the [Raspberry Pi Imager](https://www.raspberrypi.com/software/) tool available on the official website. </br>

After installing the system, you can either access the Raspberry Pi OS using keyboard and monitor connected directly to the computer, or remotely via SSH.

To access the device via SSH, enter the following in the terminal:

```
  ssh username@ipAddress
  password
```
The default SSH user is "pi" and the default password is "raspberry".

### Safe shutdown
> [!WARNING]
> The raspberrypi microcomputer should not be turned off by immediately disconnecting the power supply, as this may damage the system or the SD card. 

To safely turn off the device, enter the following the the Raspberry Pi OS terminal:
```
  sudo shutdown -h now
```
And wait until the green LED on the raspberry stops blinking.

<a name="setup-flask"></a>
# Setup Flask Web Server on the Raspberry Pi
First, install the required dependencies for this project:

```
sudo apt update
sudo apt upgrade

sudo apt install python3-pip

pip install Flask
pip install Flask-Cors
pip install adafruit-circuitpython-dht
```
Then, go to the backend folder and run the server.py file
```
python server.py
```

<a name="expansion-possibilities"></a>
## Expansion Possibilities
- Due to the low availability of hardware components, the communication between Raspberry Pi and sensors & actuators is achieved via wired connections. In a full-scale building automation system, communication could take place wirelessly, e.g. via the ZigBee, Bluetooth, LoRa or MQTT. However, that would require additional hardware components and different software architecture decisions.
- RGB LEDs can be replaced with a regular light bulb or an RGB bulb powered directly from the power grid. Such light source can be controlled via a wireless relay. The good example would be ESP8266.
- The same rule can be applied to other hardware elements, such as motors. The servomechanism used in the project is controlled via PWM signal modulation, which is widely used control technique in the industrial world. 

