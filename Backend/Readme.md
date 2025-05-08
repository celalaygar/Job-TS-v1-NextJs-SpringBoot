
DOCKER CONTAİNER

docker run --name some-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres



CURL


curl --location 'localhost:8080/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"admin@gmail.com",
    "password":"admin"
}'

------------------------------------------------------------------------------------------------------------------------------

curl --location 'localhost:8080/api/auth/user/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MzY0NTM2MjEsImV4cCI6MTczNjU0MDAyMX0.BWW93djTlk8J524SX-ljHSXrfScN-gFGA4qNQiI91dEh_ib1vZuCB4cghz_-LlVaJC2Tmx1OS2ivzl53XlET5w' \
--data ''

------------------------------------------------------------------------------------------------------------------------------

curl --location 'localhost:8080/api/ai/dream' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MzY2MDI0MTgsImV4cCI6MTczNjY4ODgxOH0.r5LYYScQFDUDZMIuwJBA4hx2RQr5_t02lnStPK_59HGL9ArHy10QY05w4B_f9z2HWVCD94FCUcvOz_uX_qQppQ' \
--data '{ "dreamText":"Halay" }'

------------------------------------------------------------------------------------------------------------------------------

**GET /api/ai/horoscope/aries/daily
    → sign(Burç) = "aries"
    → period = "daily"**

curl --location 'localhost:8080/api/ai/horoscope/aries/daily' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MzY2MDI3NzAsImV4cCI6MTczNjY4OTE3MH0.VSVw4MghfovkmJ-rn2WTMndwUwHIkTRTjPj6SNVtYCm0N7-pHKfxM0OiPx1EQbvrKZMAxYzt8mhZiTISptePSQ'


------------------------------------------------------------------------------------------------------------------------------
**CREATE PREMIUM 
POST localhost:8080/api/premium/1

curl --location --request POST 'localhost:8080/api/premium/1' \
--header 'Authorization: eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3Mzc2NjI3MjUsImV4cCI6MTczNzc0OTEyNX0.dzJQ0L7PX3TAoXLMWVq9OM6-R7605UAq69PCf7t2qfhETaePDcMkDfOqRhmUXWJdGM2_da4a6HQsEL6HWk9eCQ' \
--data ''


------------------------------------------------------------------------------------------------------------------------------
**GET PREMIUM DETAL
GET localhost:8080/api/premium/1

curl --location 'localhost:8080/api/premium/1' \
--header 'Authorization: eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3Mzc2NjI5ODcsImV4cCI6MTczNzc0OTM4N30.Ogm36r-_NBryDtyJjuH8aBJTZkhTREPDihtxlodVl2LoaWlvST61SXdLhzwwS6tavUC5kJWYbNuwnxxUW3_KrA' \
--data ''

------------------------------------------------------------------------------------------------------------------------------
