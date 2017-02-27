import Errors from "./Errors";

class Form {

    constructor() {
        this.initialize();
        this.errors = new Errors(this);
    }

    initialize() {
        this.initializeFields();
        this.initializeCountries();
        this.initializeCounties();
        this.initializeContactOptions();
    }

    set(step, name, value) {
        this[step][name] = value;
        this.validate(step, name);
    }

    get(step, name) {
        if (this[step] !== null && this[step][name] !== null) {
            return this[step][name];
        }

        return '';
    }

    validateAll(step) {
        // TODO: Loop through all fields and call validate
        if (typeof step === 'undefined') {
            // Loop through all values
        } else {
            // Loop through all values on given step
        }
    }

    validateOnTheGo(step, name, index) {

        let normalValidationFields = {
            person_data: [
                'first-name', 'last-name'
            ],
            stolen_properties: [
                'name'
            ]
        };

        // Run normal validation for fields if needed
        let normalValidation = false;
        if (normalValidationFields[step].includes(name)) normalValidation = true;

        if (normalValidation) {
            return this.validate(step, name, index);
        }

        let errorMessage = '';
        // Then do on the go validation
        if (step === 'stolen_properties') {
            if (name === 'year_of_acquiring') {
                if (!this.isNumeric(this[step][index][name])) {
                    errorMessage = 'Soetamise aasta ei tohi sisaldada tähti';
                } else if (('' + this[step][index][name]).length < 4) {
                    errorMessage = 'dont-show-success';
                } else if (('' + this[step][index][name]).length >= 4) {
                    console.log('validating');
                    // Do validation only if the user has typed in 4 or more numbers
                    return this.validate(step, name, index);
                }
            }
        }

        if (typeof index !== 'undefined') {
            this.errors[step][index][name] = errorMessage;
        } else {
            this.errors.add(step, name, errorMessage);
        }
    }

    validate(step, name, index) {
        if (typeof step === 'undefined') {
            // Called validate()
            this.validateAll();
        } else if (typeof name === 'undefined') {
            // Validate all on the given step
            this.validateAll(step);
        }

        let errorMessage = '';

        // TODO: Better way to validate?

        if (step === 'person_data') {
            if (name === 'first-name') {
                if (!this.exists(this[step][name])) {
                    errorMessage = 'Eesnimi on kohustuslik!';
                }
            } else if (name === 'last-name') {
                if (!this.exists(this[step][name])) {
                    errorMessage = 'Perenimi on kohustuslik!';
                }
            } else if (name === 'date-of-birth') {
                if (!this.exists(this[step][name])) {
                    errorMessage = 'Sünniaeg on kohustuslik!';
                }
                // TODO: Check if past etc.
            } else if (name === 'zip-code') {
                if (!this.isNumeric(this[step][name])) {
                    errorMessage = 'Postiindeks peab olema number!';
                }
            }
        } else if (step === 'stolen_properties') {
            if (name === 'name') {
                if (!this.exists(this[step][index][name])) {
                    errorMessage = 'Nimetus on kohustuslik!';
                }
            } else if (name === 'year_of_acquiring') {
                let checkedVal = this[step][index][name];
                if (checkedVal) {
                    let currentYear = new Date().getFullYear();
                    if (checkedVal < 1800) {
                        errorMessage = 'Soetamise aasta peab olema suurem kui 1800';
                    } else if (checkedVal > currentYear) {
                        errorMessage = 'Vara ei saa olla soetatud hiljem kui ' + currentYear;
                    }
                }
            } else if ((name === 'property_exists_time' || name === 'property_lost_time') && this.exists(this[step][index][name])){
                let checkedVal = this[step][index][name];
                // check format http://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy
                if ((!checkedVal) || /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.]\d\d\d\d$/.test(checkedVal)){
                    let dateArr = checkedVal.split(".");
    
                    let date = new Date(dateArr[2],dateArr[1],dateArr[0]);
                    if (date < new Date("1800-1-1")) {
                      errorMessage = 'Kuupäev ei saa olla varem kui 01.01.1800';
                    } else if (date > new Date()) {
                      errorMessage = 'Kuupäev ei saa olla tulevikus';
                    }
                } else {
                    errorMessage = 'Kuupäev peab olema formaadis pp.kk.aaaa'
                }
            }
        } else if (step === 'witnesses' || step === 'perpetrators'){
                  if (name == 'email' && this.exists(this[step][index][name])){
                      if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(this[step][index][name])){
                          errorMessage = "Ebakorrektne email"
                      }
                  } else if (name == 'personal_code'){
                      if (!/[0-9]{2}[0,1,2,4][0-9][0-9]{2}[0-9]{4}/.test(this[step][index][name]) && this[step][index][name] ){
                        errorMessage = "Ei vasta Eesti isikukoodile";
                      }
  
                  } else if (name === 'date_of_birth'){
                      let checkedVal = this[step][index][name];
                      // check format http://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy
                      if (this.exists(checkedVal)){
                          if (/^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.]\d\d\d\d$/.test(checkedVal)){
                              let dateArr = checkedVal.split(".");
        
                              let date = new Date(dateArr[2],dateArr[1],dateArr[0]);
                              if (date < new Date("1800-1-1")) {
                                  errorMessage = 'Ei saa olla sündinud varem kui 1800';
                              } else if (date > new Date()) {
                                  errorMessage = 'Ei saa olla sündinud tulevikus';
                              }
                          } else {
                              errorMessage = 'Kuupäev peab olema formaadis pp.kk.aaaa'
                          }
                      }
                  }
          }

        if (typeof index !== 'undefined') {
            this.errors[step][index][name] = errorMessage;
        } else {
            this.errors.add(step, name, errorMessage);
        }
    }

    exists(val) {
        return val !== null && val.length > 0;
    }

    isNumeric(val) {
        return val === null || val.length === 0 || /^\d+$/.test(val);
    }

    addStolenProperty() {
        this.addToList('stolen_properties', {
            name: '',
            year_of_acquiring: '',
            value: null,
            in_locked_area: false,
            special_indicators: '',
            property_exists_time: null,
            property_lost_time: null,
        });
    }

    removeStolenProperty(index) {
        this.stolen_properties.splice(index, 1);
        this.errors.stolen_properties.splice(index, 1);
    }

    addPerpetrator() {
        this.addToList('perpetrators', {
            first_name: '',
            last_name: '',
            date_of_birth: null,
            personal_code: null,
            citizenship: null,
            profession: '',
            address: '',
            email: '',
            phone: '',
            special_indicators: '',
        });
    }

    removePerpetrator(index) {
        this.perpetrators.splice(index, 1);
        this.errors.perpetrators.splice(index, 1);
    }

    addWitness() {
        this.addToList('witnesses', {
            first_name: '',
            last_name: '',
            date_of_birth: null,
            personal_code: null,
            citizenship: null,
            address: '',
            email: '',
            phone: '',
        });
    }

    removeWitness(index) {
        this.witnesses.splice(index, 1);
        this.errors.witnesses.splice(index, 1);
    }

    addToList(listName, object) {
        this[listName].push(object);
        let errorObj = {};

        for (let property in object) {
            errorObj[property] = '';
        }

        this.errors[listName].push(errorObj);
    }

    loggedInWithIdCard() {
        this.person_data['first-name'] = 'Juhan';
        this.person_data['last-name'] = 'Lumi';
        this.person_data['date-of-birth'] = '04.12.1990';
        this.person_data['citizenship'] = 'Eesti Vabariik';
        this.validate('person_data', 'first-name');
        this.validate('person_data', 'last-name');
        this.validate('person_data', 'date-of-birth');
        this.validate('person_data', 'citizenship');
    }

    initializeCounties() {
        this.counties = [
            {value: "Harju maakond", text: "Harju maakond"},
            {value: "Hiiu maakond", text: "Hiiu maakond"},
            {value: "Ida-Viru maakond", text: "Ida-Viru maakond"},
            {value: "Jõgeva maakond", text: "Jõgeva maakond"},
            {value: "Järva maakond", text: "Järva maakond"},
            {value: "Lääne maakond", text: "Lääne maakond"},
            {value: "Lääne-Viru maakond", text: "Lääne-Viru maakond"},
            {value: "Põlva maakond", text: "Põlva maakond"},
            {value: "Pärnu maakond", text: "Pärnu maakond"},
            {value: "Rapla maakond", text: "Rapla maakond"},
            {value: "Saare maakond", text: "Saare maakond"},
            {value: "Tartu maakond", text: "Tartu maakond"},
            {value: "Valga maakond", text: "Valga maakond"},
            {value: "Viljandi maakond", text: "Viljandi maakond"},
            {value: "Võru maakond", text: "Võru maakond"},
        ];
    }

    initializeCountries() {
        this.countries = [
            {value: "Eesti Vabariik", text: "Eesti Vabariik"},
            {value: "Afganistan", text: "Afganistan"},
            {value: "Ahvenamaa ", text: "Ahvenamaa "},
            {value: "Albaania ", text: "Albaania "},
            {value: "Alžeeria", text: "Alžeeria"},
            {value: "Ameerika Samoa", text: "Ameerika Samoa"},
            {value: "Ameerika Ühendriigid", text: "Ameerika Ühendriigid"},
            {value: "Andorra ", text: "Andorra "},
            {value: "Angola", text: "Angola"},
            {value: "Anguilla ", text: "Anguilla "},
            {value: "Antarktis", text: "Antarktis"},
            {value: "Antigua ja Barbuda", text: "Antigua ja Barbuda"},
            {value: "Aomen", text: "Aomen"},
            {value: "Araabia Ühendemiraadid", text: "Araabia Ühendemiraadid"},
            {value: "Argentina ", text: "Argentina "},
            {value: "Armeenia ", text: "Armeenia "},
            {value: "Aruba", text: "Aruba"},
            {value: "Aserbaidžaan", text: "Aserbaidžaan"},
            {value: "Austraalia", text: "Austraalia"},
            {value: "Austria ", text: "Austria "},
            {value: "Bahama ", text: "Bahama "},
            {value: "Bahrein", text: "Bahrein"},
            {value: "Bangladesh", text: "Bangladesh"},
            {value: "Barbados", text: "Barbados"},
            {value: "Belau ", text: "Belau "},
            {value: "Belgia", text: "Belgia"},
            {value: "Belize", text: "Belize"},
            {value: "Benin", text: "Benin"},
            {value: "Bermuda", text: "Bermuda"},
            {value: "Bhutan", text: "Bhutan"},
            {value: "Boliivia Paljurahvuseline Riik", text: "Boliivia Paljurahvuseline Riik"},
            {value: "Bonaire, Sint Eustatius ja Saba", text: "Bonaire, Sint Eustatius ja Saba"},
            {value: "Bosnia- ja Hertsegoviina", text: "Bosnia- ja Hertsegoviina"},
            {value: "Botswana", text: "Botswana"},
            {value: "Bouvet' saar", text: "Bouvet' saar"},
            {value: "Brasiilia ", text: "Brasiilia "},
            {value: "Briti India ookeani ala", text: "Briti India ookeani ala"},
            {value: "Briti Neitsisaared", text: "Briti Neitsisaared"},
            {value: "Brunei Darussalam", text: "Brunei Darussalam"},
            {value: "Bulgaaria", text: "Bulgaaria"},
            {value: "Burkina Faso", text: "Burkina Faso"},
            {value: "Burundi ", text: "Burundi "},
            {value: "Colombia", text: "Colombia"},
            {value: "Cooki saared", text: "Cooki saared"},
            {value: "Costa Rica ", text: "Costa Rica "},
            {value: "Curaçao", text: "Curaçao"},
            {value: "Curaçao (Holl", text: "Curaçao (Holl"},
            {value: "Djibouti ", text: "Djibouti "},
            {value: "Dominica ", text: "Dominica "},
            {value: "Dominikaani Vabariik", text: "Dominikaani Vabariik"},
            {value: "Ecuador", text: "Ecuador"},
            {value: "Egiptus", text: "Egiptus"},
            {value: "Ekvatoriaal-Guinea", text: "Ekvatoriaal-Guinea"},
            {value: "El Salvador", text: "El Salvador"},
            {value: "Elevandiluurannik", text: "Elevandiluurannik"},
            {value: "Eritrea Riik", text: "Eritrea Riik"},
            {value: "Etioopia", text: "Etioopia"},
            {value: "Falklandi (Malviini) saared", text: "Falklandi (Malviini) saared"},
            {value: "Fidži ", text: "Fidži "},
            {value: "Filipiini Vabariik", text: "Filipiini Vabariik"},
            {value: "Fääri saared", text: "Fääri saared"},
            {value: "Gabon", text: "Gabon"},
            {value: "Gambia ", text: "Gambia "},
            {value: "Ghana", text: "Ghana"},
            {value: "Gibraltar ", text: "Gibraltar "},
            {value: "Grenada", text: "Grenada"},
            {value: "Gruusia", text: "Gruusia"},
            {value: "Gröönimaa", text: "Gröönimaa"},
            {value: "Guadeloupe", text: "Guadeloupe"},
            {value: "Guam", text: "Guam"},
            {value: "Guatemala", text: "Guatemala"},
            {value: "Guernsey", text: "Guernsey"},
            {value: "Guernsey (GBR", text: "Guernsey (GBR"},
            {value: "Guinea ", text: "Guinea "},
            {value: "Guinea-Bissau ", text: "Guinea-Bissau "},
            {value: "Guyana ", text: "Guyana "},
            {value: "Haiti ", text: "Haiti "},
            {value: "Heard ja McDonald", text: "Heard ja McDonald"},
            {value: "Hiina ", text: "Hiina "},
            {value: "Hispaania ", text: "Hispaania "},
            {value: "Holland", text: "Holland"},
            {value: "Hollandi Antillid", text: "Hollandi Antillid"},
            {value: "Honduras", text: "Honduras"},
            {value: "Hongkong", text: "Hongkong"},
            {value: "Horvaatia", text: "Horvaatia"},
            {value: "Ida-Timori", text: "Ida-Timori"},
            {value: "Ida-Timori", text: "Ida-Timori"},
            {value: "Iirimaa", text: "Iirimaa"},
            {value: "Iisrael", text: "Iisrael"},
            {value: "ilma kodakondsuseta", text: "ilma kodakondsuseta"},
            {value: "India ", text: "India "},
            {value: "Indoneesia ", text: "Indoneesia "},
            {value: "Iraak", text: "Iraak"},
            {value: "Iraan", text: "Iraan"},
            {value: "Island", text: "Island"},
            {value: "Itaalia", text: "Itaalia"},
            {value: "Jaapan", text: "Jaapan"},
            {value: "Jamaica", text: "Jamaica"},
            {value: "Jeemen", text: "Jeemen"},
            {value: "Jersey", text: "Jersey"},
            {value: "JEY", text: "JEY"},
            {value: "Jordaania", text: "Jordaania"},
            {value: "Jugoslaavia", text: "Jugoslaavia"},
            {value: "Jõulusaar", text: "Jõulusaar"},
            {value: "Kaimanisaared (GBR", text: "Kaimanisaared (GBR"},
            {value: "Kambodža", text: "Kambodža"},
            {value: "Kamerun", text: "Kamerun"},
            {value: "Kanada", text: "Kanada"},
            {value: "Kasahstan", text: "Kasahstan"},
            {value: "Katar", text: "Katar"},
            {value: "Kenya ", text: "Kenya "},
            {value: "Kesk-Aafrika Vabariik", text: "Kesk-Aafrika Vabariik"},
            {value: "Kiribati", text: "Kiribati"},
            {value: "Komoori Liit", text: "Komoori Liit"},
            {value: "Kongo ", text: "Kongo "},
            {value: "Kongo DV", text: "Kongo DV"},
            {value: "Kookossaared (Keelingi saared", text: "Kookossaared (Keelingi saared"},
            {value: "Korea RDV", text: "Korea RDV"},
            {value: "Korea Vabariik", text: "Korea Vabariik"},
            {value: "Kosovo", text: "Kosovo"},
            {value: "Kreeka ", text: "Kreeka "},
            {value: "Kuuba ", text: "Kuuba "},
            {value: "Kuveit", text: "Kuveit"},
            {value: "Kõrgõzstan", text: "Kõrgõzstan"},
            {value: "Küpros", text: "Küpros"},
            {value: "Laos", text: "Laos"},
            {value: "Leedu ", text: "Leedu "},
            {value: "Lesotho ", text: "Lesotho "},
            {value: "Libeeria", text: "Libeeria"},
            {value: "Liechtenstein", text: "Liechtenstein"},
            {value: "Liibanon", text: "Liibanon"},
            {value: "Liibüa", text: "Liibüa"},
            {value: "Luksemburg", text: "Luksemburg"},
            {value: "Lõuna-Aafrika Vabariik", text: "Lõuna-Aafrika Vabariik"},
            {value: "Lõuna-Georgia ja Lõuna-Sandwich", text: "Lõuna-Georgia ja Lõuna-Sandwich"},
            {value: "Lõuna-Sudaan", text: "Lõuna-Sudaan"},
            {value: "Läti Vabariik", text: "Läti Vabariik"},
            {value: "Lääne-Sahara", text: "Lääne-Sahara"},
            {value: "Madagaskar", text: "Madagaskar"},
            {value: "Makedoonia", text: "Makedoonia"},
            {value: "Malaisia", text: "Malaisia"},
            {value: "Malawi ", text: "Malawi "},
            {value: "Maldiivid", text: "Maldiivid"},
            {value: "Mali ", text: "Mali "},
            {value: "Malta ", text: "Malta "},
            {value: "Mani saar", text: "Mani saar"},
            {value: "Maroko ", text: "Maroko "},
            {value: "Marshalli Saared", text: "Marshalli Saared"},
            {value: "Martinique", text: "Martinique"},
            {value: "Mauritaania", text: "Mauritaania"},
            {value: "Mauritius", text: "Mauritius"},
            {value: "Mayotte", text: "Mayotte"},
            {value: "Mehhiko", text: "Mehhiko"},
            {value: "Mikroneesia ", text: "Mikroneesia "},
            {value: "Moldova", text: "Moldova"},
            {value: "Monaco ", text: "Monaco "},
            {value: "Mongoolia", text: "Mongoolia"},
            {value: "Montenegro", text: "Montenegro"},
            {value: "Montserrat", text: "Montserrat"},
            {value: "Mosambiik", text: "Mosambiik"},
            {value: "Myanmar", text: "Myanmar"},
            {value: "Namiibia ", text: "Namiibia "},
            {value: "Nauru ", text: "Nauru "},
            {value: "Nepal", text: "Nepal"},
            {value: "Nicaragua", text: "Nicaragua"},
            {value: "Nigeeria", text: "Nigeeria"},
            {value: "Niger", text: "Niger"},
            {value: "Niue", text: "Niue"},
            {value: "Norfolki Saar", text: "Norfolki Saar"},
            {value: "Norra ", text: "Norra "},
            {value: "Omaan", text: "Omaan"},
            {value: "Paapua Uus-Guinea", text: "Paapua Uus-Guinea"},
            {value: "Pakistan", text: "Pakistan"},
            {value: "Palestiina okupeeritud alad", text: "Palestiina okupeeritud alad"},
            {value: "Panama", text: "Panama"},
            {value: "Paraguay", text: "Paraguay"},
            {value: "Peruu ", text: "Peruu "},
            {value: "Pitcairn", text: "Pitcairn"},
            {value: "Poola ", text: "Poola "},
            {value: "Portugali ", text: "Portugali "},
            {value: "Prantsuse Guajaana", text: "Prantsuse Guajaana"},
            {value: "Prantsuse Lõunaalad", text: "Prantsuse Lõunaalad"},
            {value: "Prantsuse Polüneesia ", text: "Prantsuse Polüneesia "},
            {value: "Prantsusmaa", text: "Prantsusmaa"},
            {value: "Puerto Rico", text: "Puerto Rico"},
            {value: "Põhja-Mariaanid", text: "Põhja-Mariaanid"},
            {value: "Püha Tool (Vatikan", text: "Püha Tool (Vatikan"},
            {value: "Réunion", text: "Réunion"},
            {value: "Riik teadmata", text: "Riik teadmata"},
            {value: "Roheneemesaared", text: "Roheneemesaared"},
            {value: "Rootsi Kuningriik", text: "Rootsi Kuningriik"},
            {value: "Rumeenia", text: "Rumeenia"},
            {value: "Rwanda ", text: "Rwanda "},
            {value: "Saalomoni Saared", text: "Saalomoni Saared"},
            {
                value: "Saint Helena, Ascension ja Tristan da Cunha (GBR",
                text: "Saint Helena, Ascension ja Tristan da Cunha (GBR"
            },
            {value: "Saint Kitts ja Nevis", text: "Saint Kitts ja Nevis"},
            {value: "Saint Lucia", text: "Saint Lucia"},
            {value: "Saint Pierre ja Miquelon", text: "Saint Pierre ja Miquelon"},
            {value: "Saint Vincent ja Grenadiinid", text: "Saint Vincent ja Grenadiinid"},
            {value: "Saint-Barthélemy (FRA", text: "Saint-Barthélemy (FRA"},
            {value: "Saint-Martin (Prantsuse osa) (FRA", text: "Saint-Martin (Prantsuse osa) (FRA"},
            {value: "Saksamaa ", text: "Saksamaa "},
            {value: "Sambia ", text: "Sambia "},
            {value: "Samoa ", text: "Samoa "},
            {value: "San Marino ", text: "San Marino "},
            {value: "Sao Tomé ja Principe", text: "Sao Tomé ja Principe"},
            {value: "Saudi Araabia ", text: "Saudi Araabia "},
            {value: "Seišellid", text: "Seišellid"},
            {value: "Senegal", text: "Senegal"},
            {value: "Serbia ", text: "Serbia "},
            {value: "Sierra Leone ", text: "Sierra Leone "},
            {value: "Singapur", text: "Singapur"},
            {value: "Sint Marteen (Hollandi osa", text: "Sint Marteen (Hollandi osa"},
            {value: "Slovakkia", text: "Slovakkia"},
            {value: "Sloveenia", text: "Sloveenia"},
            {value: "Somaali Vabariik", text: "Somaali Vabariik"},
            {value: "Soome ", text: "Soome "},
            {value: "Sri Lanka", text: "Sri Lanka"},
            {value: "Sudaan", text: "Sudaan"},
            {value: "Suriname", text: "Suriname"},
            {value: "Suurbritannia", text: "Suurbritannia"},
            {value: "Svaasimaa", text: "Svaasimaa"},
            {value: "Svalbard ja Jan Mayen", text: "Svalbard ja Jan Mayen"},
            {value: "Süüria ", text: "Süüria "},
            {value: "Šveits", text: "Šveits"},
            {value: "Zimbabwe", text: "Zimbabwe"},
            {value: "Taani", text: "Taani"},
            {value: "Tadžikistan", text: "Tadžikistan"},
            {value: "Tai ", text: "Tai "},
            {value: "Taiwan", text: "Taiwan"},
            {value: "Tansaania ", text: "Tansaania "},
            {value: "Togo ", text: "Togo "},
            {value: "Tokelau", text: "Tokelau"},
            {value: "Tonga ", text: "Tonga "},
            {value: "Trinidad ja Tobago", text: "Trinidad ja Tobago"},
            {value: "Tšaad", text: "Tšaad"},
            {value: "Tšehhi ", text: "Tšehhi "},
            {value: "Tšiili ", text: "Tšiili "},
            {value: "Tuneesia ", text: "Tuneesia "},
            {value: "Turks ja Caicos", text: "Turks ja Caicos"},
            {value: "Tuvalu", text: "Tuvalu"},
            {value: "Türgi ", text: "Türgi "},
            {value: "Türkmenistan", text: "Türkmenistan"},
            {value: "Uganda ", text: "Uganda "},
            {value: "Ukraina", text: "Ukraina"},
            {value: "Ungari ", text: "Ungari "},
            {value: "Uruguay", text: "Uruguay"},
            {value: "USA Neitsisaared", text: "USA Neitsisaared"},
            {value: "Usbekistan", text: "Usbekistan"},
            {value: "Uus-Kaledoonia", text: "Uus-Kaledoonia"},
            {value: "Uus-Meremaa", text: "Uus-Meremaa"},
            {value: "Valgevene ", text: "Valgevene "},
            {value: "Wallis ja Futuna", text: "Wallis ja Futuna"},
            {value: "Vanuatu ", text: "Vanuatu "},
            {value: "Venemaa Föderatsioon", text: "Venemaa Föderatsioon"},
            {value: "Venezuela", text: "Venezuela"},
            {value: "Vietnam", text: "Vietnam"},
            {value: "Ühendriikide hajasaared", text: "Ühendriikide hajasaared"},
            {value: "Mujal nimetamata territooriumid", text: "Mujal nimetamata territooriumid"},
            {value: "Määratlemata", text: "Määratlemata"},
        ];
    }

    initializeContactOptions() {
        this.contact_options = [
            {value: 'email', text: 'E-posti teel'},
            {value: 'phone', text: 'Telefoni teel'},
        ];
    }

    initializeFields() {
        this.person_data = {
            'first-name': '',
            'last-name': '',
            'date-of-birth': '',
            'citizenship': 'Eesti Vabariik',
            'address': '',
            'zip-code': '',
            'is-legal-person': false,
            'victim-registry-code': '',
            'county': '',
            'contact-option': 'email',
            'email': '',
            'phone': '',
            'contact-time': ''
        };
        this.event_info = {};

        this.stolen_properties = [];
        this.perpetrators = [];
        this.witnesses = [];

        this.options = {
            'ok-with-deal': false,
            'info-e-toimik': false,
        }
    }
}

export default Form;
