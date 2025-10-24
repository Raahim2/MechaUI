import requests
import os
from dotenv import load_dotenv  

load_dotenv()   
API_KEY = os.getenv("API_KEY")
BASE_URL = "https://projects-api-three.vercel.app/DBMS"




def add_data(api_key, dbname, collection_name, document):
    endpoint = f"{BASE_URL}/add_data"
    
    payload = {
        "API_KEY": api_key,  
        "db_name": dbname,
        "collection_name": collection_name,
        "document": document
    }
    
    response = requests.post(endpoint, json=payload)
    
    print("Add Data Response:", response.json())


def fetch_data(api_key, dbname, collection_name, filter_condition={}):
    endpoint = f"{BASE_URL}/fetch"
    
    payload = {
        "API_KEY": api_key,
        "db_name": dbname,
        "collection_name": collection_name,
        "filter_condition": filter_condition
    }
    
    headers = {'Content-Type': 'application/json'}
    
    response = requests.post(endpoint, headers=headers, json=payload)
    
    if response.status_code == 200:
        print("Fetch Data Response:", response.json())
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")
        print("Response:", response.text)


def delete_data(api_key ,db_name, collection_name, filter_condition):
    url = f'{BASE_URL}/delete'
    data = {
        'API_KEY': api_key,
        'db_name': db_name,
        'collection_name': collection_name,
        'filter_condition': filter_condition
    }

    # Send DELETE request to delete data
    response = requests.delete(url, json=data)

    # Handle the response
    if response.status_code == 200:
        print("Data deleted successfully!")
        print("Response:", response.json())  
    else:
        print(f"Failed to delete data. Status code: {response.status_code}")
        print("Response:", response.text)


def update_data(api_key, dbname, collection_name, filter_condition, update_data):
    endpoint = f"{BASE_URL}/update"

    payload = {
        "API_KEY": api_key,
        "db_name": dbname,
        "collection_name": collection_name,
        "filter_condition": filter_condition,
        "update_data": update_data
    }

    response = requests.put(endpoint, json=payload)

    if response.status_code == 200:
        print("Update Data Response:", response.json())
    else:
        print(f"Failed to update data. Status code: {response.status_code}")
        print("Response:", response.text)



print(fetch_data("", "GenTube", "Users"))