-- MENA Labor Intelligence — analyst query pack

-- 1) 2025 female working-age participation and gender gap
SELECT wbcountryname,
       ROUND(lfp_wa_f*100,1) AS female_wa_lfp_pct,
       ROUND((lfp_wa_m-lfp_wa_f)*100,1) AS gender_gap_pp
FROM latest_labor
ORDER BY female_wa_lfp_pct DESC;

-- 2) Largest 2025 participation gaps
SELECT wbcountryname,
       ROUND(lfp_wa_m*100,1) AS male_lfp_pct,
       ROUND(lfp_wa_f*100,1) AS female_lfp_pct,
       ROUND((lfp_wa_m-lfp_wa_f)*100,1) AS gap_pp
FROM latest_labor
ORDER BY gap_pp DESC;

-- 3) 2020 -> 2025 changes
SELECT country,wa_lfp_change_pp,wa_employment_change_pp,hcip_change
FROM country_change
ORDER BY wa_lfp_change_pp DESC;

-- 4) Income-group comparison
SELECT wbincomegroup,
       COUNT(*) countries,
       ROUND(AVG(lfp_wa_mf*100),1) avg_wa_lfp_pct,
       ROUND(AVG(emp_wa_mf*100),1) avg_wa_employment_pct,
       ROUND(AVG((lfp_wa_m-lfp_wa_f)*100),1) avg_gender_gap_pp
FROM latest_labor
GROUP BY wbincomegroup;

-- 5) Window-function composite: high participation + lower gap
WITH scored AS (
 SELECT wbcountryname,
        lfp_wa_mf*100 AS lfp_pct,
        (lfp_wa_m-lfp_wa_f)*100 AS gap_pp,
        PERCENT_RANK() OVER (ORDER BY lfp_wa_mf) AS lfp_rank,
        PERCENT_RANK() OVER (ORDER BY (lfp_wa_m-lfp_wa_f) DESC) AS gap_rank
 FROM latest_labor
)
SELECT wbcountryname,ROUND(lfp_pct,1),ROUND(gap_pp,1),
       ROUND((lfp_rank+gap_rank)/2.0,3) composite
FROM scored
ORDER BY composite DESC;