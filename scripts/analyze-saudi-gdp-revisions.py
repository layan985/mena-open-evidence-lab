#!/usr/bin/env python3
import csv
import json
import math
import sys
from pathlib import Path

INPUT = Path(sys.argv[1] if len(sys.argv) > 1 else 'data/saudi-gdp-revision-input-template.csv')
OUTPUT = Path(sys.argv[2] if len(sys.argv) > 2 else 'data/saudi-gdp-revision-analysis.json')


def num(x):
    x = (x or '').strip()
    if not x:
        return None
    return float(x)


def sign_label(x):
    if x is None:
        return None
    if x > 0:
        return 'growth'
    if x < 0:
        return 'contraction'
    return 'zero_growth'

rows = []
with INPUT.open(newline='', encoding='utf-8') as f:
    for raw in csv.DictReader(f):
        year = int(raw['year'])
        pre = num(raw['pre_revision_real_gdp_growth_pct'])
        post = num(raw['post_revision_real_gdp_growth_pct'])
        row = {
            'year': year,
            'pre_revision_real_gdp_growth_pct': pre,
            'post_revision_real_gdp_growth_pct': post,
            'pre_source_ref': raw.get('pre_source_ref') or None,
            'post_source_ref': raw.get('post_source_ref') or None,
            'extraction_status': raw.get('extraction_status') or None,
        }
        if pre is not None and post is not None:
            delta = post - pre
            row.update({
                'revision_pp': round(delta, 6),
                'absolute_revision_pp': round(abs(delta), 6),
                'earlier_conclusion': sign_label(pre),
                'later_conclusion': sign_label(post),
                'sign_reversal': (pre < 0 < post) or (post < 0 < pre),
                'zero_threshold_crossing': (pre <= 0 < post) or (post <= 0 < pre),
            })
        rows.append(row)

complete = [r for r in rows if r['pre_revision_real_gdp_growth_pct'] is not None and r['post_revision_real_gdp_growth_pct'] is not None]
by_year = {r['year']: r for r in complete}

# Acceleration/deceleration reversal: compare the direction of growth-rate change
# from t-1 to t in each vintage. This is only evaluated where both adjacent years exist.
accel_reversals = []
for year in sorted(by_year):
    prev = by_year.get(year - 1)
    cur = by_year[year]
    if not prev:
        continue
    pre_change = cur['pre_revision_real_gdp_growth_pct'] - prev['pre_revision_real_gdp_growth_pct']
    post_change = cur['post_revision_real_gdp_growth_pct'] - prev['post_revision_real_gdp_growth_pct']
    pre_dir = 'acceleration' if pre_change > 0 else 'deceleration' if pre_change < 0 else 'unchanged'
    post_dir = 'acceleration' if post_change > 0 else 'deceleration' if post_change < 0 else 'unchanged'
    if {pre_dir, post_dir} == {'acceleration', 'deceleration'}:
        accel_reversals.append({
            'year': year,
            'pre_vintage_direction': pre_dir,
            'post_vintage_direction': post_dir,
            'pre_change_pp': round(pre_change, 6),
            'post_change_pp': round(post_change, 6),
        })

result = {
    'schema_version': '0.1',
    'dataset': 'Saudi GDP Revision Reconstruction',
    'input': str(INPUT),
    'coverage_requested': [2011, 2023],
    'complete_years': len(complete),
    'pending_years': [r['year'] for r in rows if r not in complete],
    'records': rows,
    'summary': {
        'sign_reversals': [r for r in complete if r.get('sign_reversal')],
        'zero_threshold_crossings': [r for r in complete if r.get('zero_threshold_crossing')],
        'acceleration_deceleration_reversals': accel_reversals,
        'mean_absolute_revision_pp': (round(sum(r['absolute_revision_pp'] for r in complete) / len(complete), 6) if complete else None),
        'max_absolute_revision': (max(complete, key=lambda r: r['absolute_revision_pp']) if complete else None),
    },
    'claim_boundary': 'Only years with values extracted from both identified official GASTAT vintages are analyzed. Pending rows are excluded from every statistic and reversal count.'
}

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Analyzed {len(complete)} complete year(s); {len(rows)-len(complete)} pending.')
print(f'Sign reversals: {len(result["summary"]["sign_reversals"])}')
print(f'Wrote {OUTPUT}')
