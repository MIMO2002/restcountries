from flask import Flask, render_template, request
import requests

app = Flask(__name__)

# REST Countries API base URL
api_base_url = "https://restcountries.com/v3.1/"

# Number of rows per page
rows_per_page = 25

@app.route("/")
@app.route("/home")
def home():
    # Retrieve all country data from the API
    response = requests.get(api_base_url + "all", verify=False)
    countries = response.json()

    # Get the search query from the URL parameters
    query = request.args.get("query")

    # Fuzzy search functionality
    if query:
        filtered_countries = []
        for country in countries:
            if query.lower() in country["name"]["official"].lower():
                filtered_countries.append(country)
        countries = filtered_countries

    # Sorting functionality
    sort_order = request.args.get("sort")
    if sort_order == "asc":
        countries = sorted(countries, key=lambda c: c["name"]["official"])
    elif sort_order == "desc":
        countries = sorted(countries, key=lambda c: c["name"]["official"], reverse=True)

    # Pagination
    page = request.args.get("page", default=1, type=int)
    start_index = (page - 1) * rows_per_page
    end_index = start_index + rows_per_page
    paginated_countries = countries[start_index:end_index]

    return render_template("home.html", countries=paginated_countries, query=query, sort_order=sort_order, current_page=page, rows_per_page=rows_per_page)


@app.route("/country/<country_code>")
def country_detail(country_code):
    # Retrieve country data by country code from the API
    response = requests.get(api_base_url + "alpha/" + country_code, verify=False)
    countries = response.json()  # Assuming the response is a list of countries
    country = countries[0]  # Access the first country in the list

    capital = country.get('capital', [''])[0]
    curKey = list(country["currencies"].keys())[0]
    languages = country["languages"]

    # return jsonify(currency)
    return render_template("country_detail.html", country=country, capital=capital, curKey=curKey, languages=languages)


if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0')