from pathlib import Path
import pandas as pd
import streamlit as st

ROOT = Path(__file__).resolve().parents[1]
df = pd.read_csv(ROOT / "data/raw/worldbank_hci_plus_mena_extract.csv")
chg = pd.read_csv(ROOT / "results/country_change_2020_2025.csv")

st.set_page_config(page_title="MENA Labor Intelligence", layout="wide")
st.title("MENA Labor Intelligence")
st.caption("Real public data from the World Bank HCI+ panel. Selected economies, 2020 and 2025.")

latest = df[df.year == 2025].copy()
c1, c2, c3 = st.columns(3)
c1.metric("Economies", latest.iso3c.nunique())
c2.metric("Median female WA participation", f"{latest.lfp_wa_f.median() * 100:.1f}%")
c3.metric("Median WA participation gender gap", f"{((latest.lfp_wa_m - latest.lfp_wa_f) * 100).median():.1f} pp")

metric = st.selectbox("Metric", ["lfp_wa_f", "lfp_wa_mf", "emp_wa_mf", "shr_wemp_wa_mf"])
chart = latest[["wbcountryname", metric]].set_index("wbcountryname") * 100
st.bar_chart(chart.sort_values(metric))

st.subheader("2020 → 2025 change")
st.dataframe(chg.sort_values("wa_lfp_change_pp", ascending=False), use_container_width=True)
st.caption("Descriptive analysis only: cross-country differences are not causal effects.")