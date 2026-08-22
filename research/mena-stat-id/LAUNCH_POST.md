I think we lose most of a statistic when we copy the number.

Saudi Arabia reported unemployment of 6.4% among Saudis in Q1 2026. The rate for the total population was 3.1%.

Jordan reported 16.1% for the entire population and 21.1% for Jordanians.

All four numbers are correct. Put them under the same label and the comparison becomes false.

I built the first public alpha of MENA-STAT-ID at the MENA Open Data & Evidence Lab.

It contains 42 source-derived cases and 84 Arabic-English prompts testing whether a system preserves the identity of an official statistic: population, period, unit, method, vintage and source.

A correct number attached to the wrong population fails. A revised value used before its release date fails. A method break treated as a continuous series fails.

The benchmark, schema, scorer, source trail and failure conditions are public. The alpha has no external reviewers yet, and I want people working on official statistics, Arabic NLP and reproducible research to try to break it before the scoring protocol is frozen.

