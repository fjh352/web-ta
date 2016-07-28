#comment
import os
screenshot_dirs=os.walk("failures")
for root, dirs, files in screenshot_dirs:
	if len(files)==0 and len(dirs)==0:
		print "no failure case"
		break
	else:
		with open("report/failureFileList.txt","w") as f:
			for file in files:
				f.write(str(file))
				f.write("\n")

