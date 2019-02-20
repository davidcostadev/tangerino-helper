# Tangerino Helper

this Project is for get how many hours we need to pay



## Instalation

- `git clone`
- `yarn`
- `cp .env.example .env`
- Add your informations on env



## Which informations?

**EMPLOYER_CODE** and **PIN**

<img src="https://github.com/davidcostadev/tangerinohelper/raw/master/assets/info-1.png" />

**USER_NAME**

<img src="https://github.com/davidcostadev/tangerinohelper/raw/master/assets/info-2.png" />

## TIPS
 - You can get your **EMPLOYER_CODE** by checking the very first TANGERINO email you received, or by asking HR.
 - **PIN** is the 4 digit number you use punch in and out every day.
 - **USER_NAME** is a string with your name. You can copy this from the email you receive every time you punch in/out under the field 'Funcionário'.



## Usage

`yarn start`



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
