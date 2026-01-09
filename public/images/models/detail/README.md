# Model Detail Images

Place your model detail images here for the Models Tab Section.

## Required Files

Each model needs a detail image:

- `edpower-detail.jpg` - EdPower model detail image
- `athena-detail.jpg` - Athena model detail image
- `victory-detail.jpg` - Victory model detail image
- `mini-detail.jpg` - Mini model detail image

## Image Specifications

- **Format**: JPG, PNG, or WebP
- **Recommended Size**: 1000x1000px (square, 1:1 aspect ratio)
- **Minimum Size**: 800x800px
- **File Size**: Optimize to <300KB for fast loading
- **Content**: High-quality product shots of each model

## Image Requirements

### EdPower
- Premium model product shot
- Show SuperCharge features
- Professional photography

### Athena
- Mid-range model product shot
- Show design and features
- Professional photography

### Victory
- Popular model product shot
- Show reliability and performance
- Professional photography

### Mini
- Entry-level model product shot
- Show compact design
- Professional photography

## File Location

Place images directly in `/public/images/models/` folder:

```
/public/images/models/
  ├── edpower-detail.jpg
  ├── athena-detail.jpg
  ├── victory-detail.jpg
  └── mini-detail.jpg
```

## Usage

Images will automatically appear in the Models Tab Section when:
1. File is placed in the correct location
2. File name matches exactly: `{model-id}-detail.jpg`
3. Browser is refreshed

## Fallback

If image is not found, a placeholder will be shown with instructions on where to place the image.
