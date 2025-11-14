import pandas as pd

def save_data(path, data):
    df = pd.DataFrame(data)
    df.to_csv(path, index=False, encoding="utf-8")

