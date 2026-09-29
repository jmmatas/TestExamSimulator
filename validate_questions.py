<<<<<<< HEAD
import pathlib, re, json, sys
path = pathlib.Path('questions.js')
text = path.read_text(encoding='utf-8')
# extract QUESTIONS array content
m = re.search(r'const\s+QUESTIONS\s*=\s*(\[.*\])\s*;\s*$', text, re.S)
if not m:
    print('ERROR: QUESTIONS array not found')
    sys.exit(1)
arr_text = m.group(1)
# remove trailing commas from JS-style arrays/objects to make the content valid JSON
arr_text = re.sub(r',\s*(?=[}\]])', '', arr_text)
try:
    data = json.loads(arr_text)
except json.JSONDecodeError as e:
    print('ERROR JSON:', e)
    sys.exit(1)
print('OK', len(data), 'questions')
seen = set()
missing=[]
invalid=[]
for idx,q in enumerate(data, start=1):
    if 'num' not in q:
        print('MISSING num at item', idx)
        continue
    num = q['num']
    if num in seen:
        print('DUPLICATE num', num)
    seen.add(num)
    if q.get('type') == 'dragdrop':
        if not all(k in q for k in ('items','targets','correct')):
            print('MISSING dragdrop field in', num)
    elif q.get('type') == 'mcq':
        opts = q.get('options', [])
        letters = {o['letter'] for o in opts if 'letter' in o}
        for c in q.get('correct', []):
            if c not in letters:
                invalid.append((num, c))
    else:
        if 'type' not in q:
            print('MISSING type in', num)
for n in range(1, max(seen)+1 if seen else 1):
    if n not in seen:
        missing.append(n)
if missing:
    print('MISSING nums', missing[:20], '... total', len(missing))
for num,c in invalid:
    print('INVALID correct letter', c, 'in q', num)
if not missing and not invalid:
    print('VALIDATION PASSED')
=======
import pathlib, re, json, sys
path = pathlib.Path('questions.js')
text = path.read_text(encoding='utf-8')
# extract QUESTIONS array content
m = re.search(r'const\s+QUESTIONS\s*=\s*(\[.*\])\s*;\s*$', text, re.S)
if not m:
    print('ERROR: QUESTIONS array not found')
    sys.exit(1)
arr_text = m.group(1)
# remove trailing commas from JS-style arrays/objects to make the content valid JSON
arr_text = re.sub(r',\s*(?=[}\]])', '', arr_text)
try:
    data = json.loads(arr_text)
except json.JSONDecodeError as e:
    print('ERROR JSON:', e)
    sys.exit(1)
print('OK', len(data), 'questions')
seen = set()
missing=[]
invalid=[]
for idx,q in enumerate(data, start=1):
    if 'num' not in q:
        print('MISSING num at item', idx)
        continue
    num = q['num']
    if num in seen:
        print('DUPLICATE num', num)
    seen.add(num)
    if q.get('type') == 'dragdrop':
        if not all(k in q for k in ('items','targets','correct')):
            print('MISSING dragdrop field in', num)
    elif q.get('type') == 'mcq':
        opts = q.get('options', [])
        letters = {o['letter'] for o in opts if 'letter' in o}
        for c in q.get('correct', []):
            if c not in letters:
                invalid.append((num, c))
    else:
        if 'type' not in q:
            print('MISSING type in', num)
for n in range(1, max(seen)+1 if seen else 1):
    if n not in seen:
        missing.append(n)
if missing:
    print('MISSING nums', missing[:20], '... total', len(missing))
for num,c in invalid:
    print('INVALID correct letter', c, 'in q', num)
if not missing and not invalid:
    print('VALIDATION PASSED')
>>>>>>> 3603bee (Changes)
