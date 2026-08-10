RATE_COLS = [
    "lfp_ya_mf", "lfp_ya_m", "lfp_ya_f",
    "emp_ya_mf", "emp_ya_m", "emp_ya_f",
    "lfp_wa_mf", "lfp_wa_m", "lfp_wa_f",
    "emp_wa_mf", "emp_wa_m", "emp_wa_f",
    "shr_wemp_wa_mf", "shr_wemp_wa_m", "shr_wemp_wa_f",
]


def validate(df):
    return {
        "duplicate_country_year": int(df.duplicated(["iso3c", "year"]).sum()),
        "rate_violations": int(((df[RATE_COLS] < 0) | (df[RATE_COLS] > 1)).sum().sum()),
        "countries": int(df.iso3c.nunique()),
    }