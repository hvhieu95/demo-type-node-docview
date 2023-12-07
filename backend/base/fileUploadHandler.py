from spire.presentation import Presentation, FileFormat
import os
import base64
import hashlib
import random

STORE_ROOT = 'media/store'
DATABASE_STORE_ROOT = 'store'

def handle_uploaded_file(file):
    responseSaveFile = {
        'result': False,
        'message': "unsupported file type",
        'file_link': None
    }
    filename = file.name
    filenameForSaveIntoDatabase = prepareFilename(getBasename(filename))
    if filename.endswith('.pdf'):
        saveAt = "{}/{}/{}.pdf".format(STORE_ROOT, 'pdfs', filenameForSaveIntoDatabase)
        with open(saveAt, "wb+") as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        responseSaveFile['result'] = True
        responseSaveFile['message'] = 'save file success'
        responseSaveFile['file_link'] = "{}/{}/{}.pdf".format(DATABASE_STORE_ROOT, 'pdfs', filenameForSaveIntoDatabase)
        return responseSaveFile
    elif filename.endswith('.pptx'):
        if not os.path.exists("{}/{}".format(STORE_ROOT, 'others')):
            os.makedirs("{}/{}".format(STORE_ROOT, 'others'))
        saveAtOthers = "{}/{}/{}.pptx".format(STORE_ROOT, 'others', filenameForSaveIntoDatabase)
        with open(saveAtOthers, "wb+") as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        presentation = Presentation()
        presentation.LoadFromFile(saveAtOthers)
        saveAtPdfs = "{}/{}/{}.pdf".format(STORE_ROOT, 'pdfs', filenameForSaveIntoDatabase)
        presentation.SaveToFile(saveAtPdfs, FileFormat.PDF)
        presentation.Dispose()
        os.remove(saveAtOthers)
        responseSaveFile['result'] = True
        responseSaveFile['message'] = 'save file success'
        responseSaveFile['file_link'] = "{}/{}/{}.pdf".format(DATABASE_STORE_ROOT, 'pdfs', filenameForSaveIntoDatabase)
        return responseSaveFile
    return responseSaveFile

def prepareFilename(basename):
    responseFilename = ''
    while True:
        hashStr = encrypt("{}{}".format(basename, random.randint(0, 99)))
        for i in range(16):
            currentFilename = hashStr[i:i+10]
            if not os.path.isfile("{}/{}/{}.pdf".format(STORE_ROOT, 'pdfs',currentFilename)):
                responseFilename = hashStr
                break
        if responseFilename != '':
            break
    return responseFilename

def getBasename(fillname): 
    basename, extension = os.path.splitext(os.path.basename(fillname)) 
    return basename

def encrypt(s):
    md5 = hashlib.md5()
    md5.update(s.encode('utf-8'))
    hash_in_bytes = md5.digest()
    result = base64.b32encode(hash_in_bytes).strip(b'=')
    return result.decode("utf-8")

