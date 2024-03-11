<div align="center">
  
# Smart Home Management Platform

  <p align="center">
    <i>[⚠️ Still in development ]</i> <br/>
    <i>Project done for an engineering thesis</i> <br/>
    Lublin University of Technology <br/>
    Faculty of Electrical Engineering and Computer Science <br/>
    Department of Electrical Engineering and Intelligent Technologies
    <br />
  </p>
</div>


## About The Project

**Thesis title:** <i>Design and implementation of a smart home management platform</i> <br/>
The main goal was to develop a system allowing for remote control of home automation devices using the HTTP protocol and a smartphone application. The project assumes creation of a low-budget electronic model using a set of sensors and actuators simulating the operation of real home devices. The brain of the whole system is a Raspberry PI microcomputer, responsible for managing connected devices and enabling remote communication with the end-user's smartphone application. This repository, along with the documentation below, can also serve as inspiration and help for people who want to start their adventure with IoT, embedded systems or RaspberryPi.


## Features
- Home arming function - Controlling the operation of the motion sensor and detecting intrusions.
- Sending notifications and turning on the alarm when an intrusion is detected, with the option of turning off each of these functions.
- Measuring current temperature and humidity in a room and displaying data in the application.
- Remote control of the servo mechanism representing automatic blinds.
- RGB lighting with the ability to set any color and brightness from the application.
- Various lighting scenes.
- Displaying current weather data based on the weather api.


# Table of contents
- [Part list](#part-list)
- [Hardware Architecture](#hardware-architecture)
- [Software Architecture](#software-architecture)
- [Used Technologies](#used-technologies)
- [Storing data and managing states](#database)
- [Network Communication](#network)
- [Ionic App - Architecture and setup guide](#ionic)
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
![scheme1](https://github.com/MKaczmarski07/smart-home/assets/95142305/3e49a798-4e40-4fc1-89e5-addfad4a8309)
<i>Some components must be directly grounded to the raspberry pi to work properly. However, it is not recommended to power components such as motors directly from the board pins, because too high current may damage the pin or the computer.</i> <br/>


<a name="software-architecture"></a>
## Software Architecture
![software architecture](https://github.com/MKaczmarski07/smart-home/assets/95142305/5c28e503-e384-4ae9-9a3b-06f5e70e3058)


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
[🔗]()<br>
… -->

<a name="database"></a>
## Storing data and managing states
All states and attributes are stored in the relational database in a table named states. Every IoT device and utility ( such as light scene ) is represented by a unique address.

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


<a name="ionic"></a>
## Ionic App
### Core Architecture
Ionic Framework is a collection of customisable UI Components and tools, allowing for cross-platform develompent. The same code base, written using popular web frameworks ( e.g Angular or React ) can work on many platforms and use native functionalities. It's possible thanks to the Capacitor - a native runtime built by the Ionic team.<br/>

For this project, I decided to use Angular version 17 as the main framework. While the Standalone approach is newer and makes use of more modern Angular 17 APIs, the Modules approach is currently more supported in Ionic. Most of the Angular examples on documentation website use the Modules approach.<br/>

Breaking the application into modules allows for significant reduction of loading time. Main routing strategy uses [Ionic Tabs](https://ionicframework.com/docs/api/tabs) architecture, which also increases performance of the native application.

### Setup Guide
Before you begin, make sure you have the following installed on your machine:

- Node.js (version 18.13 or later) 
- npm package manager (version 9.0 or later)

To install all required dependencies, move to the app main workspace ( frontend folder ) and run:

    npm i

To create a localhost port type:

    ionic serve

Your application is ready at port 8100.

    http://localhost:8100/


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
