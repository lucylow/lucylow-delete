from yolov8 import YOLOv8Model
from clip import CLIPModel
from pytesseract import image_to_string

class VisualLinguisticGrounding:
    def __init__(self):
        self.yolo = YOLOv8Model('yolov8n.pt')
        self.clip = CLIPModel()

    def analyze(self, image):
        bboxes, labels = self.yolo.detect(image)
        ocr_text = image_to_string(image)
        embeddings = self.clip.encode(image, texts=labels + [ocr_text])
        ui_elements = []
        for bbox, label, embedding in zip(bboxes, labels, embeddings):
            ui_elements.append({
                'bbox': bbox,
                'label': label,
                'text': ocr_text,
                'embedding': embedding
            })
        return ui_elements
