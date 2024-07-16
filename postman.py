# import http.client

# conn = http.client.HTTPSConnection("api.signnow.com")

# payload = "-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"username\"\r\n\r\nlsalazar@gjx.ai\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"password\"\r\n\r\nGJX2024\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"grant_type\"\r\n\r\npassword\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"scope\"\r\n\r\n*\r\n-----011000010111000001101001--\r\n"

# headers = {
#     'Authorization': "Basic M2UxMjg3YWEwNjBmZDk3MDc4N2FhNmRmZjQzY2JjNDM6ZjY5ODM2Zjk2YzhhYzUzZGZhNTUyM2E4MWM2OWJlOWE=",
#     'Content-type': "multipart/form-data; boundary=---011000010111000001101001",
#     'Content-Type': "multipart/form-data",
#     'Accept': "application/json, "
# }

# conn.request("POST", "/oauth2/token", payload, headers)

# res = conn.getresponse()
# data = res.read()

# print(data.decode("utf-8"))
import http.client

conn = http.client.HTTPSConnection("api.signnow.com")

payload = "-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"file\"\r\n\r\nC:\\Users\\gjxpc\\Downloads\\clausula.docx\r\n-----011000010111000001101001--\r\n"

headers = {
    'Authorization': "Bearer 340f04bafc03e2d3305557247c4eb1595414d2c24668aec3b7b331cc4d4139ee",
    'Content-Type': "multipart/form-data; boundary=---011000010111000001101001",
    'Accept': "application/json"
}

conn.request("POST", "/document", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
