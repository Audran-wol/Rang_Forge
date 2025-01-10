import json
import os
import requests
from datetime import datetime

# Your JSON data as a string
data = '''
{
    "countries": [
      "Afghanistan",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Argentina",
      "Armenia",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahrain",
      "Bangladesh",
      "Belarus",
      "Belgium",
      "Benin",
      "Bhutan",
      "Bolivia",
      "Bosnia And Herzegovina",
      "Botswana",
      "Brazil",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Chad",
      "Chile",
      "China",
      "Colombia",
      "Congo",
      "Croatia",
      "Cuba",
      "Cyprus",
      "Czechia",
      "Denmark",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Estonia",
      "Ethiopia",
      "Finland",
      "France",
      "Georgia",
      "Germany",
      "Ghana",
      "Greece",
      "Guatemala",
      "Honduras",
      "Hong Kong",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kuwait",
      "Laos",
      "Latvia",
      "Lithuania",
      "Luxembourg",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Mauritania",
      "Mauritius",
      "Mexico",
      "Moldova",
      "Mongolia",
      "Montenegro",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nepal",
      "Netherlands",
      "New Zealand",
      "Nicaragua",
      "Nigeria",
      "Norway",
      "Oman",
      "Pakistan",
      "Palestine",
      "Panama",
      "Paraguay",
      "Peru",
      "Philippines",
      "Poland",
      "Portugal",
      "Qatar",
      "Romania",
      "Russia",
      "Rwanda",
      "San Marino",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "South Africa",
      "South Korea",
      "Spain",
      "Sri Lanka",
      "Sudan",
      "Sweden",
      "Switzerland",
      "Syria",
      "Taiwan",
      "Tanzania",
      "Thailand",
      "Tunisia",
      "Turkey",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "Uruguay",
      "Uzbekistan",
      "Venezuela",
      "Vietnam",
      "Yemen",
      "Zambia",
      "Zimbabwe"
    ]
  }
'''

# Parse the JSON data
parsed_data = json.loads(data)

# Directory to save the files (change as needed)
output_dir = "country_files"
os.makedirs(output_dir, exist_ok=True)

# Base URL for fetching data
base_url = "https://raw.githubusercontent.com/gayanvoice/top-github-users/main/cache"

# Function to fetch data for a country
def fetch_country_data(country):
    url = f"{base_url}/{country.replace(' ', '_').lower()}.json"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch data for {country}. Status code: {response.status_code}")
        return None

# Function to update country files
def update_country_files():
    for country in parsed_data["countries"]:
        filename = f"{country.replace(' ', '_').lower()}.json"
        filepath = os.path.join(output_dir, filename)
        
        # Fetch data from the URL
        country_data = fetch_country_data(country)
        if country_data:
            # Write the fetched data to the file
            with open(filepath, 'w') as f:
                json.dump(country_data, f, indent=4)
            print(f"Updated {filename}")
        else:
            print(f"Skipping {filename} (no data available)")

# Run the update process
update_country_files()
print("Update process completed.")