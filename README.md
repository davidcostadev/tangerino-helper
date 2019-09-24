# Tangerino Helper 

This project will calc the hours for you


## Installation

- `git clone`
- `yarn`
- `cp .env.example .env`
- Add your informations on env

## Usage

`yarn start`


## Configuration

**EMPLOYER_CODE** and **PIN**

<img src="https://github.com/davidcostadev/tangerinohelper/raw/master/assets/info-1.png" />

**USER_NAME**

<img src="https://github.com/davidcostadev/tangerinohelper/raw/master/assets/info-2.png" />

# TIPS
 - You can get your **EMPLOYER_CODE** by checking the very first TANGERINO email you received, or by asking HR.
 - **PIN** is the 4 digit number you use punch in and out every day.
 - **USER_NAME** is a string with your name. You can copy this from the email you receive every time you punch in/out under the field 'Funcionário'.

Your '.env' should look similar to this:
```
EMPLOYER_CODE=ASD2Y
PIN=1234
USER_NAME='John Doe'
```







## Output Example

```
balance
previous month: 00:55 CREDIT
current month: -04:41 DEBT
```

<img src="https://github.com/davidcostadev/tangerinohelper/raw/master/assets/output-2.gif" />



## Contributors

Thanks for

- David Costa [@davidcostadev](https://github.com/davidcostadev)
- Jhonny Michel [@jhonnymichel](https://github.com/jhonnymichel) for the Balance Calc
