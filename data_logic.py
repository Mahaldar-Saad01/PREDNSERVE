import numpy as np
import pandas as pd
from datetime import datetime, timedelta

np.random.seed(42)

menu = [
"Biryani","Fried_Rice","Noodles","Paneer_Curry","Chicken_Curry",
"Soup","Parotta","Idli","Dosa","Samosa","Cooldrinks","IceCream",
"Puri","Tea","Coffee"
]

base_demand = {
"Biryani":120,"Fried_Rice":80,"Noodles":70,"Paneer_Curry":60,"Chicken_Curry":90,
"Soup":40,"Parotta":50,"Idli":110,"Dosa":100,"Samosa":85,"Cooldrinks":95,
"IceCream":75,"Puri":90,"Tea":140,"Coffee":120
}

price = {
"Biryani":220,"Fried_Rice":180,"Noodles":160,"Paneer_Curry":200,"Chicken_Curry":240,
"Soup":120,"Parotta":100,"Idli":60,"Dosa":80,"Samosa":30,"Cooldrinks":50,
"IceCream":90,"Puri":70,"Tea":20,"Coffee":40
}

weather_options = ["Sunny","Cloudy","Rainy"]
seasons = ["Winter","Summer","Monsoon"]

start_date = datetime(2024,1,1)
days = 365

rows = []
historical_sales = {item:base_demand[item] for item in menu}

for i in range(days):

    date = start_date + timedelta(days=i)
    day_of_week = date.strftime("%A")

    temperature = np.random.normal(30,4)
    weather = np.random.choice(weather_options,p=[0.5,0.3,0.2])
    season = np.random.choice(seasons)

    event = np.random.choice(
        ["None","Festival","Local_Event"],
        p=[0.85,0.10,0.05]
    )

    is_weekend = 1 if day_of_week in ["Saturday","Sunday"] else 0
    holiday = 1 if event=="Festival" else 0
    promotion = np.random.choice([0,1],p=[0.8,0.2])

    for item in menu:

        demand = base_demand[item]

        if is_weekend:
            demand *= 1.15

        if event=="Festival":
            demand *= 1.30

        if promotion:
            demand *= 1.20

        if weather=="Rainy":
            if item in ["Soup","Samosa","Parotta","Tea"]:
                demand *= 1.30

        if temperature > 34:
            if item in ["Cooldrinks","IceCream"]:
                demand *= 1.45
            if item=="Soup":
                demand *= 0.60
            if item=="Tea":
                demand *= 0.85

        if temperature < 24:
            if item in ["Soup","Tea","Coffee"]:
                demand *= 1.30

        if item in ["Idli","Dosa","Puri"]:
            demand *= 0.95

        if item=="Samosa":
            demand *= 1.10

        if item in ["Tea","Coffee"] and not is_weekend:
            demand *= 1.10

        demand *= (1 - price[item]/2500)

        demand *= (0.6 + 0.4*(historical_sales[item]/base_demand[item]))

        actual_sales = int(np.random.normal(demand, demand*0.08))
        actual_sales = max(5,actual_sales)

        # predicted demand based on previous trend
        predicted_sales = int(actual_sales * np.random.uniform(0.9,1.1))

        # production with safety buffer
        buffer = np.random.uniform(0.05,0.15)
        production = int(predicted_sales * (1 + buffer))

        wastage = max(0, production - actual_sales)

        historical_sales[item] = actual_sales

        rows.append({
            "date":date,
            "day_of_week":day_of_week,
            "temperature":round(temperature,1),
            "weather":weather,
            "season":season,
            "event":event,
            "is_weekend":is_weekend,
            "holiday":holiday,
            "menu_item":item,
            "historical_sales":historical_sales[item],
            "price":price[item],
            "promotion":promotion,
            "predicted_sales":predicted_sales,
            "production":production,
            "actual_sales":actual_sales,
            "wastage":wastage
        })

df = pd.DataFrame(rows)

df.to_csv("restaurant_sales.csv",index=False)

print(df.head())
print("Rows:",len(df))