import zipfile, sys, os
zip_path = r"C:\Users\user\Desktop\Bot uchun papka\Instagram-link.zip"
extract_dir = r"C:\Users\user\Desktop\Bot uchun papka\Instagram-link"
if not os.path.isdir(extract_dir):
    os.makedirs(extract_dir)
with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    zip_ref.extractall(extract_dir)
print('Extraction complete')
