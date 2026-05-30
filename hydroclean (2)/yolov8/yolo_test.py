# yolo_test.py
# Sample YOLOv8 test script (not connected to the web app)

from ultralytics import YOLO

def test_yolo():
    print("Loading YOLOv8 model...")

    # Load the YOLOv8 model file
    model = YOLO("yolov8n.pt")

    print("YOLOv8 model loaded successfully")

    # Example detection command (not executed)
    print("Ready to run detection on images")

if __name__ == "__main__":
    test_yolo()