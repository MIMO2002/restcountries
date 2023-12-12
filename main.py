from flask import Flask, render_template, request
import requests

app = Flask(__name__)

# REST Countries API base URL
api_base_url = "https://restcountries.com/v3.1/"

# Number of rows per page
rows_per_page = 25

@app.route("/")
def index():
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

    return render_template("index.html", countries=paginated_countries, query=query, sort_order=sort_order, current_page=page, rows_per_page=rows_per_page)


@app.route("/country/<country_code>")
def country_detail(country_code):
    # Retrieve country data by country code from the API
    response = requests.get(api_base_url + "alpha/" + country_code, verify=False)
    country = response.json()

    return render_template("country_detail.html", country=country)


if __name__ == "__main__":
    app.run(debug=True)