import requests

endpoint = "http://127.0.0.1:8000/api/token/"
username = "poc"
password = "poc"

# response = requests.post(
#     endpoint, 
#     headers={
#         "Content-Type": "application/json"
#     },
#     json={
#         "username":username,
#         "password":password
#     }
# )
# accessKey = response.json()["access"]

# response = requests.get(
#     "http://127.0.0.1:8000/api/posts/", 
#     headers={
#         "Content-Type": "application/json",
#         'Authorization':'Poc ' + accessKey
#     }
# )
# print(response.json())
# {'args': {}, 'data': '', 'files': {}, 
#  'form': {}, 
#  'headers': {'Accept': '*/*', 
#              'Accept-Encoding': 'gzip, deflate', 
#              'Host': 'httpbin.org', 
#              'User-Agent': 'python-requests/2.31.0', 
#              'X-Amzn-Trace-Id': 'Root=1-654c43d3-0fffd01e30ea8523397b9b63'}, 
#  'json': None, 
#  'method': 'GET', 'origin': '126.113.229.246', 'url': 'https://httpbin.org/anything'}

#csrf
response = requests.get(
    "http://127.0.0.1:8000/api/csrf/"
)
# print(response.json()['token'])

# upload file
url = "http://127.0.0.1:8000/api/upload/"
# url = "https://httpbin.org/anything"
files = {'file': open('test.pdf', 'rb')}
test_res = requests.post(url, files=files, headers={'Content-type': 'application/pdf', 'X-CSRFToken': response.json()['token']})
# test_res = requests.post(url, files=files, headers={'Content-type': 'application/pdf'}, )
if test_res.ok:
    print(" File uploaded successfully ! ")
    print(test_res.text)
else:
    print(" Please Upload again ! ")