from flask import Flask, render_template
from bs4 import BeautifulSoup
import cloudscraper

app = Flask(__name__)


@app.route("/")
def home():
    return render_template('home.html')

@app.route("/recipes/<query>", methods=['GET'])
def search(query):
    
    scraper = cloudscraper.create_scraper(delay=10, browser='chrome')
    url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + query
    soup = BeautifulSoup(scraper.get(url).text, "html.parser")
    return soup.text

if __name__ == "__main__":
    app.run()
    
