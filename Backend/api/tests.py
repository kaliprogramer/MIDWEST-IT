
import cv2
import numpy as np
from PIL import Image
path="/home/kali/Pictures/hacker.jpg"


# Load image
image = cv2.imread(path)

# Create a mask
mask = np.zeros(image.shape[:2], np.uint8)

# Define background and foreground models
bgdModel = np.zeros((1, 65), np.float64)
fgdModel = np.zeros((1, 65), np.float64)

# Define rectangle around the object (x, y, width, height)
rect = (50, 50, image.shape[1]-50, image.shape[0]-50)

# Apply GrabCut
cv2.grabCut(image, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)

# Modify mask to binary
mask2 = np.where((mask==2)|(mask==0), 0, 1).astype('uint8')

# Apply mask to original image
result = image * mask2[:, :, np.newaxis]

# Save result
cv2.imwrite("output.png", result)
