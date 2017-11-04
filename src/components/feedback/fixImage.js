/* eslint-disable */
/**
 * Javascript EXIF Reader 0.1.6
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * Licensed under the MPL License [http://www.nihilogic.dk/licenses/mpl-license.txt]
 * @private
 */
var EXIF = (function () {
  var debug = false

  var ExifTags = {
    // version tags
    0x9000: 'ExifVersion', // EXIF version
    0xa000: 'FlashpixVersion', // Flashpix format version

    // colorspace tags
    0xa001: 'ColorSpace', // Color space information tag

    // image configuration
    0xa002: 'PixelXDimension', // Valid width of meaningful image
    0xa003: 'PixelYDimension', // Valid height of meaningful image
    0x9101: 'ComponentsConfiguration', // Information about channels
    0x9102: 'CompressedBitsPerPixel', // Compressed bits per pixel

    // user information
    0x927c: 'MakerNote', // Any desired information written by the manufacturer
    0x9286: 'UserComment', // Comments by user

    // related file
    0xa004: 'RelatedSoundFile', // Name of related sound file

    // date and time
    0x9003: 'DateTimeOriginal', // Date and time when the original image was generated
    0x9004: 'DateTimeDigitized', // Date and time when the image was stored digitally
    0x9290: 'SubsecTime', // Fractions of seconds for DateTime
    0x9291: 'SubsecTimeOriginal', // Fractions of seconds for DateTimeOriginal
    0x9292: 'SubsecTimeDigitized', // Fractions of seconds for DateTimeDigitized

    // picture-taking conditions
    0x829a: 'ExposureTime', // Exposure time (in seconds)
    0x829d: 'FNumber', // F number
    0x8822: 'ExposureProgram', // Exposure program
    0x8824: 'SpectralSensitivity', // Spectral sensitivity
    0x8827: 'ISOSpeedRatings', // ISO speed rating
    0x8828: 'OECF', // Optoelectric conversion factor
    0x9201: 'ShutterSpeedValue', // Shutter speed
    0x9202: 'ApertureValue', // Lens aperture
    0x9203: 'BrightnessValue', // Value of brightness
    0x9204: 'ExposureBias', // Exposure bias
    0x9205: 'MaxApertureValue', // Smallest F number of lens
    0x9206: 'SubjectDistance', // Distance to subject in meters
    0x9207: 'MeteringMode', // Metering mode
    0x9208: 'LightSource', // Kind of light source
    0x9209: 'Flash', // Flash status
    0x9214: 'SubjectArea', // Location and area of main subject
    0x920a: 'FocalLength', // Focal length of the lens in mm
    0xa20b: 'FlashEnergy', // Strobe energy in BCPS
    0xa20c: 'SpatialFrequencyResponse', //
    0xa20e: 'FocalPlaneXResolution', // Number of pixels in width direction per FocalPlaneResolutionUnit
    0xa20f: 'FocalPlaneYResolution', // Number of pixels in height direction per FocalPlaneResolutionUnit
    0xa210: 'FocalPlaneResolutionUnit', // Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
    0xa214: 'SubjectLocation', // Location of subject in image
    0xa215: 'ExposureIndex', // Exposure index selected on camera
    0xa217: 'SensingMethod', // Image sensor type
    0xa300: 'FileSource', // Image source (3 == DSC)
    0xa301: 'SceneType', // Scene type (1 == directly photographed)
    0xa302: 'CFAPattern', // Color filter array geometric pattern
    0xa401: 'CustomRendered', // Special processing
    0xa402: 'ExposureMode', // Exposure mode
    0xa403: 'WhiteBalance', // 1 = auto white balance, 2 = manual
    0xa404: 'DigitalZoomRation', // Digital zoom ratio
    0xa405: 'FocalLengthIn35mmFilm', // Equivalent foacl length assuming 35mm film camera (in mm)
    0xa406: 'SceneCaptureType', // Type of scene
    0xa407: 'GainControl', // Degree of overall image gain adjustment
    0xa408: 'Contrast', // Direction of contrast processing applied by camera
    0xa409: 'Saturation', // Direction of saturation processing applied by camera
    0xa40a: 'Sharpness', // Direction of sharpness processing applied by camera
    0xa40b: 'DeviceSettingDescription', //
    0xa40c: 'SubjectDistanceRange', // Distance to subject

    // other tags
    0xa005: 'InteroperabilityIFDPointer',
    0xa420: 'ImageUniqueID' // Identifier assigned uniquely to each image
  }

  var TiffTags = {
    0x0100: 'ImageWidth',
    0x0101: 'ImageHeight',
    0x8769: 'ExifIFDPointer',
    0x8825: 'GPSInfoIFDPointer',
    0xa005: 'InteroperabilityIFDPointer',
    0x0102: 'BitsPerSample',
    0x0103: 'Compression',
    0x0106: 'PhotometricInterpretation',
    0x0112: 'Orientation',
    0x0115: 'SamplesPerPixel',
    0x011c: 'PlanarConfiguration',
    0x0212: 'YCbCrSubSampling',
    0x0213: 'YCbCrPositioning',
    0x011a: 'XResolution',
    0x011b: 'YResolution',
    0x0128: 'ResolutionUnit',
    0x0111: 'StripOffsets',
    0x0116: 'RowsPerStrip',
    0x0117: 'StripByteCounts',
    0x0201: 'JPEGInterchangeFormat',
    0x0202: 'JPEGInterchangeFormatLength',
    0x012d: 'TransferFunction',
    0x013e: 'WhitePoint',
    0x013f: 'PrimaryChromaticities',
    0x0211: 'YCbCrCoefficients',
    0x0214: 'ReferenceBlackWhite',
    0x0132: 'DateTime',
    0x010e: 'ImageDescription',
    0x010f: 'Make',
    0x0110: 'Model',
    0x0131: 'Software',
    0x013b: 'Artist',
    0x8298: 'Copyright'
  }

  var GPSTags = {
    0x0000: 'GPSVersionID',
    0x0001: 'GPSLatitudeRef',
    0x0002: 'GPSLatitude',
    0x0003: 'GPSLongitudeRef',
    0x0004: 'GPSLongitude',
    0x0005: 'GPSAltitudeRef',
    0x0006: 'GPSAltitude',
    0x0007: 'GPSTimeStamp',
    0x0008: 'GPSSatellites',
    0x0009: 'GPSStatus',
    0x000a: 'GPSMeasureMode',
    0x000b: 'GPSDOP',
    0x000c: 'GPSSpeedRef',
    0x000d: 'GPSSpeed',
    0x000e: 'GPSTrackRef',
    0x000f: 'GPSTrack',
    0x0010: 'GPSImgDirectionRef',
    0x0011: 'GPSImgDirection',
    0x0012: 'GPSMapDatum',
    0x0013: 'GPSDestLatitudeRef',
    0x0014: 'GPSDestLatitude',
    0x0015: 'GPSDestLongitudeRef',
    0x0016: 'GPSDestLongitude',
    0x0017: 'GPSDestBearingRef',
    0x0018: 'GPSDestBearing',
    0x0019: 'GPSDestDistanceRef',
    0x001a: 'GPSDestDistance',
    0x001b: 'GPSProcessingMethod',
    0x001c: 'GPSAreaInformation',
    0x001d: 'GPSDateStamp',
    0x001e: 'GPSDifferential'
  }

  var StringValues = {
    ExposureProgram: {
      0: 'Not defined',
      1: 'Manual',
      2: 'Normal program',
      3: 'Aperture priority',
      4: 'Shutter priority',
      5: 'Creative program',
      6: 'Action program',
      7: 'Portrait mode',
      8: 'Landscape mode'
    },
    MeteringMode: {
      0: 'Unknown',
      1: 'Average',
      2: 'CenterWeightedAverage',
      3: 'Spot',
      4: 'MultiSpot',
      5: 'Pattern',
      6: 'Partial',
      255: 'Other'
    },
    LightSource: {
      0: 'Unknown',
      1: 'Daylight',
      2: 'Fluorescent',
      3: 'Tungsten (incandescent light)',
      4: 'Flash',
      9: 'Fine weather',
      10: 'Cloudy weather',
      11: 'Shade',
      12: 'Daylight fluorescent (D 5700 - 7100K)',
      13: 'Day white fluorescent (N 4600 - 5400K)',
      14: 'Cool white fluorescent (W 3900 - 4500K)',
      15: 'White fluorescent (WW 3200 - 3700K)',
      17: 'Standard light A',
      18: 'Standard light B',
      19: 'Standard light C',
      20: 'D55',
      21: 'D65',
      22: 'D75',
      23: 'D50',
      24: 'ISO studio tungsten',
      255: 'Other'
    },
    Flash: {
      0x0000: 'Flash did not fire',
      0x0001: 'Flash fired',
      0x0005: 'Strobe return light not detected',
      0x0007: 'Strobe return light detected',
      0x0009: 'Flash fired, compulsory flash mode',
      0x000d: 'Flash fired, compulsory flash mode, return light not detected',
      0x000f: 'Flash fired, compulsory flash mode, return light detected',
      0x0010: 'Flash did not fire, compulsory flash mode',
      0x0018: 'Flash did not fire, auto mode',
      0x0019: 'Flash fired, auto mode',
      0x001d: 'Flash fired, auto mode, return light not detected',
      0x001f: 'Flash fired, auto mode, return light detected',
      0x0020: 'No flash function',
      0x0041: 'Flash fired, red-eye reduction mode',
      0x0045: 'Flash fired, red-eye reduction mode, return light not detected',
      0x0047: 'Flash fired, red-eye reduction mode, return light detected',
      0x0049: 'Flash fired, compulsory flash mode, red-eye reduction mode',
      0x004d: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected',
      0x004f: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light detected',
      0x0059: 'Flash fired, auto mode, red-eye reduction mode',
      0x005d: 'Flash fired, auto mode, return light not detected, red-eye reduction mode',
      0x005f: 'Flash fired, auto mode, return light detected, red-eye reduction mode'
    },
    SensingMethod: {
      1: 'Not defined',
      2: 'One-chip color area sensor',
      3: 'Two-chip color area sensor',
      4: 'Three-chip color area sensor',
      5: 'Color sequential area sensor',
      7: 'Trilinear sensor',
      8: 'Color sequential linear sensor'
    },
    SceneCaptureType: {
      0: 'Standard',
      1: 'Landscape',
      2: 'Portrait',
      3: 'Night scene'
    },
    SceneType: {
      1: 'Directly photographed'
    },
    CustomRendered: {
      0: 'Normal process',
      1: 'Custom process'
    },
    WhiteBalance: {
      0: 'Auto white balance',
      1: 'Manual white balance'
    },
    GainControl: {
      0: 'None',
      1: 'Low gain up',
      2: 'High gain up',
      3: 'Low gain down',
      4: 'High gain down'
    },
    Contrast: {
      0: 'Normal',
      1: 'Soft',
      2: 'Hard'
    },
    Saturation: {
      0: 'Normal',
      1: 'Low saturation',
      2: 'High saturation'
    },
    Sharpness: {
      0: 'Normal',
      1: 'Soft',
      2: 'Hard'
    },
    SubjectDistanceRange: {
      0: 'Unknown',
      1: 'Macro',
      2: 'Close view',
      3: 'Distant view'
    },
    FileSource: {
      3: 'DSC'
    },
    Components: {
      0: '',
      1: 'Y',
      2: 'Cb',
      3: 'Cr',
      4: 'R',
      5: 'G',
      6: 'B'
    }
  }

  function addEvent (element, event, handler) {
    if (element.addEventListener) {
      element.addEventListener(event, handler, false)
    } else if (element.attachEvent) {
      element.attachEvent('on' + event, handler)
    }
  }

  function imageHasData (img) {
    return !!img.exifdata
  }

  function getImageData (img, callback) {
    BinaryAjax(img.src, function (http) {
      var data = findEXIFinJPEG(http.binaryResponse)
      img.exifdata = data || {}
      if (callback) {
        callback.call(img)
      }
    })
  }

  function findEXIFinJPEG (file) {
    if (file.getByteAt(0) != 0xff || file.getByteAt(1) != 0xd8) {
      return false // not a valid jpeg
    }

    var offset = 2,
      length = file.getLength(),
      marker

    while (offset < length) {
      if (file.getByteAt(offset) != 0xff) {
        if (debug) {
          console.log(
            'Not a valid marker at offset ' +
              offset +
              ', found: ' +
              file.getByteAt(offset)
          )
        }
        return false // not a valid marker, something is wrong
      }

      marker = file.getByteAt(offset + 1)

      // we could implement handling for other markers here,
      // but we're only looking for 0xFFE1 for EXIF data

      if (marker == 22400) {
        if (debug) console.log('Found 0xFFE1 marker')

        return readEXIFData(
          file,
          offset + 4,
          file.getShortAt(offset + 2, true) - 2
        )

        // offset += 2 + file.getShortAt(offset+2, true);
      } else if (marker == 225) {
        // 0xE1 = Application-specific 1 (for EXIF)
        if (debug) console.log('Found 0xFFE1 marker')

        return readEXIFData(
          file,
          offset + 4,
          file.getShortAt(offset + 2, true) - 2
        )
      } else {
        offset += 2 + file.getShortAt(offset + 2, true)
      }
    }
  }

  function readTags (file, tiffStart, dirStart, strings, bigEnd) {
    var entries = file.getShortAt(dirStart, bigEnd),
      tags = {},
      entryOffset,
      tag,
      i

    for (i = 0; i < entries; i++) {
      entryOffset = dirStart + i * 12 + 2
      tag = strings[file.getShortAt(entryOffset, bigEnd)]
      if (!tag && debug) { console.log('Unknown tag: ' + file.getShortAt(entryOffset, bigEnd)) }
      tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd)
    }
    return tags
  }

  function readTagValue (file, entryOffset, tiffStart, dirStart, bigEnd) {
    var type = file.getShortAt(entryOffset + 2, bigEnd),
      numValues = file.getLongAt(entryOffset + 4, bigEnd),
      valueOffset = file.getLongAt(entryOffset + 8, bigEnd) + tiffStart,
      offset,
      vals,
      val,
      n,
      numerator,
      denominator

    switch (type) {
      case 1: // byte, 8-bit unsigned int
      case 7: // undefined, 8-bit byte, value depending on field
        if (numValues == 1) {
          return file.getByteAt(entryOffset + 8, bigEnd)
        } else {
          offset = numValues > 4 ? valueOffset : entryOffset + 8
          vals = []
          for (n = 0; n < numValues; n++) {
            vals[n] = file.getByteAt(offset + n)
          }
          return vals
        }

      case 2: // ascii, 8-bit byte
        offset = numValues > 4 ? valueOffset : entryOffset + 8
        return file.getStringAt(offset, numValues - 1)

      case 3: // short, 16 bit int
        if (numValues == 1) {
          return file.getShortAt(entryOffset + 8, bigEnd)
        } else {
          offset = numValues > 2 ? valueOffset : entryOffset + 8
          vals = []
          for (n = 0; n < numValues; n++) {
            vals[n] = file.getShortAt(offset + 2 * n, bigEnd)
          }
          return vals
        }

      case 4: // long, 32 bit int
        if (numValues == 1) {
          return file.getLongAt(entryOffset + 8, bigEnd)
        } else {
          vals = []
          for (var n = 0; n < numValues; n++) {
            vals[n] = file.getLongAt(valueOffset + 4 * n, bigEnd)
          }
          return vals
        }

      case 5: // rational = two long values, first is numerator, second is denominator
        if (numValues == 1) {
          numerator = file.getLongAt(valueOffset, bigEnd)
          denominator = file.getLongAt(valueOffset + 4, bigEnd)
          val = Number(numerator / denominator)
          val.numerator = numerator
          val.denominator = denominator
          return val
        } else {
          vals = []
          for (n = 0; n < numValues; n++) {
            numerator = file.getLongAt(valueOffset + 8 * n, bigEnd)
            denominator = file.getLongAt(valueOffset + 4 + 8 * n, bigEnd)
            vals[n] = Number(numerator / denominator)
            vals[n].numerator = numerator
            vals[n].denominator = denominator
          }
          return vals
        }

      case 9: // slong, 32 bit signed int
        if (numValues == 1) {
          return file.getSLongAt(entryOffset + 8, bigEnd)
        } else {
          vals = []
          for (n = 0; n < numValues; n++) {
            vals[n] = file.getSLongAt(valueOffset + 4 * n, bigEnd)
          }
          return vals
        }

      case 10: // signed rational, two slongs, first is numerator, second is denominator
        if (numValues == 1) {
          return (
            file.getSLongAt(valueOffset, bigEnd) /
            file.getSLongAt(valueOffset + 4, bigEnd)
          )
        } else {
          vals = []
          for (n = 0; n < numValues; n++) {
            vals[n] =
              file.getSLongAt(valueOffset + 8 * n, bigEnd) /
              file.getSLongAt(valueOffset + 4 + 8 * n, bigEnd)
          }
          return vals
        }
    }
  }

  function readEXIFData (file, start) {
    if (file.getStringAt(start, 4) != 'Exif') {
      if (debug) { console.log('Not valid EXIF data! ' + file.getStringAt(start, 4)) }
      return false
    }

    var bigEnd,
      tags,
      tag,
      exifData,
      gpsData,
      tiffOffset = start + 6

    // test for TIFF validity and endianness
    if (file.getShortAt(tiffOffset) == 0x4949) {
      bigEnd = false
    } else if (file.getShortAt(tiffOffset) == 0x4d4d) {
      bigEnd = true
    } else {
      if (debug) console.log('Not valid TIFF data! (no 0x4949 or 0x4D4D)')
      return false
    }

    if (file.getShortAt(tiffOffset + 2, bigEnd) != 0x002a) {
      if (debug) console.log('Not valid TIFF data! (no 0x002A)')
      return false
    }

    if (file.getLongAt(tiffOffset + 4, bigEnd) != 0x00000008) {
      if (debug) {
        console.log(
          'Not valid TIFF data! (First offset not 8)',
          file.getShortAt(tiffOffset + 4, bigEnd)
        )
      }
      return false
    }

    tags = readTags(file, tiffOffset, tiffOffset + 8, TiffTags, bigEnd)

    if (tags.ExifIFDPointer) {
      exifData = readTags(
        file,
        tiffOffset,
        tiffOffset + tags.ExifIFDPointer,
        ExifTags,
        bigEnd
      )
      for (tag in exifData) {
        switch (tag) {
          case 'LightSource':
          case 'Flash':
          case 'MeteringMode':
          case 'ExposureProgram':
          case 'SensingMethod':
          case 'SceneCaptureType':
          case 'SceneType':
          case 'CustomRendered':
          case 'WhiteBalance':
          case 'GainControl':
          case 'Contrast':
          case 'Saturation':
          case 'Sharpness':
          case 'SubjectDistanceRange':
          case 'FileSource':
            exifData[tag] = StringValues[tag][exifData[tag]]
            break

          case 'ExifVersion':
          case 'FlashpixVersion':
            exifData[tag] = String.fromCharCode(
              exifData[tag][0],
              exifData[tag][1],
              exifData[tag][2],
              exifData[tag][3]
            )
            break

          case 'ComponentsConfiguration':
            exifData[tag] =
              StringValues.Components[exifData[tag][0]] +
              StringValues.Components[exifData[tag][1]] +
              StringValues.Components[exifData[tag][2]] +
              StringValues.Components[exifData[tag][3]]
            break
        }
        tags[tag] = exifData[tag]
      }
    }

    if (tags.GPSInfoIFDPointer) {
      gpsData = readTags(
        file,
        tiffOffset,
        tiffOffset + tags.GPSInfoIFDPointer,
        GPSTags,
        bigEnd
      )
      for (tag in gpsData) {
        switch (tag) {
          case 'GPSVersionID':
            gpsData[tag] =
              gpsData[tag][0] +
              '.' +
              gpsData[tag][1] +
              '.' +
              gpsData[tag][2] +
              '.' +
              gpsData[tag][3]
            break
        }
        tags[tag] = gpsData[tag]
      }
    }

    return tags
  }

  function getData (img, callback) {
    if (!img.complete) return false
    if (!imageHasData(img)) {
      getImageData(img, callback)
    } else {
      if (callback) {
        callback.call(img)
      }
    }
    return true
  }

  function getTag (img, tag) {
    if (!imageHasData(img)) return
    return img.exifdata[tag]
  }

  function getAllTags (img) {
    if (!imageHasData(img)) return {}
    var a,
      data = img.exifdata,
      tags = {}
    for (a in data) {
      if (data.hasOwnProperty(a)) {
        tags[a] = data[a]
      }
    }
    return tags
  }

  function pretty (img) {
    if (!imageHasData(img)) return ''
    var a,
      data = img.exifdata,
      strPretty = ''
    for (a in data) {
      if (data.hasOwnProperty(a)) {
        if (typeof data[a] === 'object') {
          if (data[a] instanceof Number) {
            strPretty +=
              a +
              ' : ' +
              data[a] +
              ' [' +
              data[a].numerator +
              '/' +
              data[a].denominator +
              ']\r\n'
          } else {
            strPretty += a + ' : [' + data[a].length + ' values]\r\n'
          }
        } else {
          strPretty += a + ' : ' + data[a] + '\r\n'
        }
      }
    }
    return strPretty
  }

  function readFromBinaryFile (file) {
    return findEXIFinJPEG(file)
  }

  return {
    readFromBinaryFile: readFromBinaryFile,
    pretty: pretty,
    getTag: getTag,
    getAllTags: getAllTags,
    getData: getData,
    Tags: ExifTags,
    TiffTags: TiffTags,
    GPSTags: GPSTags,
    StringValues: StringValues
  }
})()

/**
 * Binary Ajax 0.1.10
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * Licensed under the MPL License [http://www.nihilogic.dk/licenses/mpl-license.txt]
 * @private
 */
var BinaryFile = function (strData, iDataOffset, iDataLength) {
  var data = strData
  var dataOffset = iDataOffset || 0
  var dataLength = 0

  this.getRawData = function () {
    return data
  }

  if (typeof strData === 'string') {
    dataLength = iDataLength || data.length

    this.getByteAt = function (iOffset) {
      return data.charCodeAt(iOffset + dataOffset) & 0xff
    }

    this.getBytesAt = function (iOffset, iLength) {
      var aBytes = []

      for (var i = 0; i < iLength; i++) {
        aBytes[i] = data.charCodeAt(iOffset + i + dataOffset) & 0xff
      }
      return aBytes
    }
  } else if (typeof strData === 'unknown') {
    dataLength = iDataLength || IEBinary_getLength(data)

    this.getByteAt = function (iOffset) {
      return IEBinary_getByteAt(data, iOffset + dataOffset)
    }

    this.getBytesAt = function (iOffset, iLength) {
      return new VBArray(
        IEBinary_getBytesAt(data, iOffset + dataOffset, iLength)
      ).toArray()
    }
  }

  this.getLength = function () {
    return dataLength
  }

  this.getSByteAt = function (iOffset) {
    var iByte = this.getByteAt(iOffset)
    if (iByte > 127) return iByte - 256
    else return iByte
  }

  this.getShortAt = function (iOffset, bBigEndian) {
    var iShort = bBigEndian
      ? (this.getByteAt(iOffset) << 8) + this.getByteAt(iOffset + 1)
      : (this.getByteAt(iOffset + 1) << 8) + this.getByteAt(iOffset)
    if (iShort < 0) iShort += 65536
    return iShort
  }
  this.getSShortAt = function (iOffset, bBigEndian) {
    var iUShort = this.getShortAt(iOffset, bBigEndian)
    if (iUShort > 32767) return iUShort - 65536
    else return iUShort
  }
  this.getLongAt = function (iOffset, bBigEndian) {
    var iByte1 = this.getByteAt(iOffset),
      iByte2 = this.getByteAt(iOffset + 1),
      iByte3 = this.getByteAt(iOffset + 2),
      iByte4 = this.getByteAt(iOffset + 3)

    var iLong = bBigEndian
      ? (((((iByte1 << 8) + iByte2) << 8) + iByte3) << 8) + iByte4
      : (((((iByte4 << 8) + iByte3) << 8) + iByte2) << 8) + iByte1
    if (iLong < 0) iLong += 4294967296
    return iLong
  }
  this.getSLongAt = function (iOffset, bBigEndian) {
    var iULong = this.getLongAt(iOffset, bBigEndian)
    if (iULong > 2147483647) return iULong - 4294967296
    else return iULong
  }

  this.getStringAt = function (iOffset, iLength) {
    var aStr = []

    var aBytes = this.getBytesAt(iOffset, iLength)
    for (var j = 0; j < iLength; j++) {
      aStr[j] = String.fromCharCode(aBytes[j])
    }
    return aStr.join('')
  }

  this.getCharAt = function (iOffset) {
    return String.fromCharCode(this.getByteAt(iOffset))
  }
  this.toBase64 = function () {
    return window.btoa(data)
  }
  this.fromBase64 = function (strBase64) {
    data = window.atob(strBase64)
  }
}
var BinaryAjax = (function () {
  function createRequest () {
    var oHTTP = null
    if (window.ActiveXObject) {
      oHTTP = new ActiveXObject('Microsoft.XMLHTTP')
    } else if (window.XMLHttpRequest) {
      oHTTP = new XMLHttpRequest()
    }
    return oHTTP
  }

  function getHead (strURL, fncCallback, fncError) {
    var oHTTP = createRequest()
    if (oHTTP) {
      if (fncCallback) {
        if (typeof oHTTP.onload !== 'undefined') {
          oHTTP.onload = function () {
            if (oHTTP.status == '200') {
              fncCallback(this)
            } else {
              if (fncError) fncError()
            }
            oHTTP = null
          }
        } else {
          oHTTP.onreadystatechange = function () {
            if (oHTTP.readyState == 4) {
              if (oHTTP.status == '200') {
                fncCallback(this)
              } else {
                if (fncError) fncError()
              }
              oHTTP = null
            }
          }
        }
      }
      oHTTP.open('HEAD', strURL, true)
      oHTTP.send(null)
    } else {
      if (fncError) fncError()
    }
  }

  function sendRequest (
    strURL,
    fncCallback,
    fncError,
    aRange,
    bAcceptRanges,
    iFileSize
  ) {
    var oHTTP = createRequest()
    if (oHTTP) {
      var iDataOffset = 0
      if (aRange && !bAcceptRanges) {
        iDataOffset = aRange[0]
      }
      var iDataLen = 0
      if (aRange) {
        iDataLen = aRange[1] - aRange[0] + 1
      }

      if (fncCallback) {
        if (typeof oHTTP.onload !== 'undefined') {
          oHTTP.onload = function () {
            if (
              oHTTP.status == '200' ||
              oHTTP.status == '206' ||
              oHTTP.status == '0'
            ) {
              oHTTP.binaryResponse = new BinaryFile(
                oHTTP.responseText,
                iDataOffset,
                iDataLen
              )
              oHTTP.fileSize =
                iFileSize || oHTTP.getResponseHeader('Content-Length')
              fncCallback(oHTTP)
            } else {
              if (fncError) fncError()
            }
            oHTTP = null
          }
        } else {
          oHTTP.onreadystatechange = function () {
            if (oHTTP.readyState == 4) {
              if (
                oHTTP.status == '200' ||
                oHTTP.status == '206' ||
                oHTTP.status == '0'
              ) {
                // IE6 craps if we try to extend the XHR object
                var oRes = {
                  status: oHTTP.status,
                  // IE needs responseBody, Chrome/Safari needs responseText
                  binaryResponse: new BinaryFile(
                    typeof oHTTP.responseBody === 'unknown'
                      ? oHTTP.responseBody
                      : oHTTP.responseText,
                    iDataOffset,
                    iDataLen
                  ),
                  fileSize:
                    iFileSize || oHTTP.getResponseHeader('Content-Length')
                }
                fncCallback(oRes)
              } else {
                if (fncError) fncError()
              }
              oHTTP = null
            }
          }
        }
      }
      oHTTP.open('GET', strURL, true)

      if (oHTTP.overrideMimeType) { oHTTP.overrideMimeType('text/plain; charset=x-user-defined') }

      if (aRange && bAcceptRanges) {
        oHTTP.setRequestHeader('Range', 'bytes=' + aRange[0] + '-' + aRange[1])
      }

      oHTTP.setRequestHeader(
        'If-Modified-Since',
        'Sat, 1 Jan 1970 00:00:00 GMT'
      )

      oHTTP.send(null)
    } else {
      if (fncError) fncError()
    }
  }

  return function (strURL, fncCallback, fncError, aRange) {
    if (aRange) {
      getHead(strURL, function (oHTTP) {
        var iLength = parseInt(oHTTP.getResponseHeader('Content-Length'), 10)
        var strAcceptRanges = oHTTP.getResponseHeader('Accept-Ranges')

        var iStart, iEnd
        iStart = aRange[0]
        if (aRange[0] < 0) iStart += iLength
        iEnd = iStart + aRange[1] - 1

        sendRequest(
          strURL,
          fncCallback,
          fncError,
          [iStart, iEnd],
          strAcceptRanges == 'bytes',
          iLength
        )
      })
    } else {
      sendRequest(strURL, fncCallback, fncError)
    }
  }
})()

/**
 *
 * canvasResize
 *
 * Version: 1.2.0
 * Date (d/m/y): 02/10/12
 * Update (d/m/y): 14/05/13
 * Original author: @gokercebeci
 * Licensed under the MIT license
 * - This plugin working with binaryajax.js and exif.js
 *   (It's under the MPL License http://www.nihilogic.dk/licenses/mpl-license.txt)
 * Demo: http://canvasResize.gokercebeci.com/
 *
 * - I fixed iOS6 Safari's image file rendering issue for large size image (over mega-pixel)
 *   using few functions from https://github.com/stomita/ios-imagefile-megapixel
 *   (detectSubsampling, )
 *   And fixed orientation issue by using https://github.com/jseidelin/exif-js
 *   Thanks, Shinichi Tomita and Jacob Seidelin
 * @private
 */
export default function canvasResize (file, options) {
  var pluginName = 'canvasResize'
  var methods = {
    newsize: function (w, h, W, H, C) {
      var c = C ? 'h' : ''
      if ((W && w > W) || (H && h > H)) {
        var r = w / h
        if ((r >= 1 || H === 0) && W && !C) {
          w = W
          h = (W / r) >> 0
        } else if (C && r <= W / H) {
          w = W
          h = (W / r) >> 0
          c = 'w'
        } else {
          w = (H * r) >> 0
          h = H
        }
      }
      return {
        width: w,
        height: h,
        cropped: c
      }
    },
    dataURLtoBlob: function (data) {
      var mimeString = data
        .split(',')[0]
        .split(':')[1]
        .split(';')[0]
      var byteString = atob(data.split(',')[1])
      var ab = new ArrayBuffer(byteString.length)
      var ia = new Uint8Array(ab)
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      var bb =
        window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder
      if (bb) {
        //    console.log('BlobBuilder');
        bb = new (window.BlobBuilder ||
          window.WebKitBlobBuilder ||
          window.MozBlobBuilder)()
        bb.append(ab)
        return bb.getBlob(mimeString)
      } else {
        //    console.log('Blob');
        bb = new Blob([ab], {
          type: mimeString
        })
        return bb
      }
    },
    /**
     * Detect subsampling in loaded image.
     * In iOS, larger images than 2M pixels may be subsampled in rendering.
     */
    detectSubsampling: function (img) {
      var iw = img.width,
        ih = img.height
      if (iw * ih > 1048576) {
        // subsampling may happen over megapixel image
        var canvas = document.createElement('canvas')
        canvas.width = canvas.height = 1
        var ctx = canvas.getContext('2d')
        ctx.drawImage(img, -iw + 1, 0)
        // subsampled image becomes half smaller in rendering size.
        // check alpha channel value to confirm image is covering edge pixel or not.
        // if alpha value is 0 image is not covering, hence subsampled.
        return ctx.getImageData(0, 0, 1, 1).data[3] === 0
      } else {
        return false
      }
    },
    /**
     * Update the orientation according to the specified rotation angle
     */
    rotate: function (orientation, angle) {
      var o = {
        // nothing
        1: { 90: 6, 180: 3, 270: 8 },
        // horizontal flip
        2: { 90: 7, 180: 4, 270: 5 },
        // 180 rotate left
        3: { 90: 8, 180: 1, 270: 6 },
        // vertical flip
        4: { 90: 5, 180: 2, 270: 7 },
        // vertical flip + 90 rotate right
        5: { 90: 2, 180: 7, 270: 4 },
        // 90 rotate right
        6: { 90: 3, 180: 8, 270: 1 },
        // horizontal flip + 90 rotate right
        7: { 90: 4, 180: 5, 270: 2 },
        // 90 rotate left
        8: { 90: 1, 180: 6, 270: 3 }
      }
      return o[orientation][angle] ? o[orientation][angle] : orientation
    },
    /**
     * Transform canvas coordination according to specified frame size and orientation
     * Orientation value is from EXIF tag
     */
    transformCoordinate: function (canvas, width, height, orientation) {
      switch (orientation) {
        case 5:
        case 6:
        case 7:
        case 8:
          canvas.width = height
          canvas.height = width
          break
        default:
          canvas.width = width
          canvas.height = height
      }
      var ctx = canvas.getContext('2d')
      switch (orientation) {
        case 1:
          // nothing
          break
        case 2:
          // horizontal flip
          ctx.translate(width, 0)
          ctx.scale(-1, 1)
          break
        case 3:
          // 180 rotate left
          ctx.translate(width, height)
          ctx.rotate(Math.PI)
          break
        case 4:
          // vertical flip
          ctx.translate(0, height)
          ctx.scale(1, -1)
          break
        case 5:
          // vertical flip + 90 rotate right
          ctx.rotate(0.5 * Math.PI)
          ctx.scale(1, -1)
          break
        case 6:
          // 90 rotate right
          ctx.rotate(0.5 * Math.PI)
          ctx.translate(0, -height)
          break
        case 7:
          // horizontal flip + 90 rotate right
          ctx.rotate(0.5 * Math.PI)
          ctx.translate(width, -height)
          ctx.scale(-1, 1)
          break
        case 8:
          // 90 rotate left
          ctx.rotate(-0.5 * Math.PI)
          ctx.translate(-width, 0)
          break
        default:
          break
      }
    },
    /**
     * Detecting vertical squash in loaded image.
     * Fixes a bug which squash image vertically while drawing into canvas for some images.
     */
    detectVerticalSquash: function (img, iw, ih) {
      var canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = ih
      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      var data = ctx.getImageData(0, 0, 1, ih).data
      // search image edge pixel position in case it is squashed vertically.
      var sy = 0
      var ey = ih
      var py = ih
      while (py > sy) {
        var alpha = data[(py - 1) * 4 + 3]
        if (alpha === 0) {
          ey = py
        } else {
          sy = py
        }
        py = (ey + sy) >> 1
      }
      var ratio = py / ih
      return ratio === 0 ? 1 : ratio
    },
    callback: function (d) {
      return d
    },
    extend: function () {
      var target = arguments[0] || {},
        a = 1,
        al = arguments.length,
        deep = false
      if (target.constructor === Boolean) {
        deep = target
        target = arguments[1] || {}
      }
      if (al === 1) {
        target = this
        a = 0
      }
      var prop
      for (; a < al; a++) {
        if ((prop = arguments[a]) !== null) {
          for (var i in prop) {
            if (target === prop[i]) continue
            if (deep && typeof prop[i] === 'object' && target[i]) { methods.extend(target[i], prop[i]) } else if (prop[i] !== undefined) target[i] = prop[i]
          }
        }
      }
      return target
    }
  }
  var defaults = {
    width: 300,
    height: 0,
    crop: false,
    quality: 80,
    rotate: 0,
    callback: methods.callback
  }

  Plugin.prototype = {
    init: function () {
      // this.options.init(this);
      var $this = this
      var file = this.file

      var reader = new FileReader()
      reader.onloadend = function (e) {
        var dataURL = e.target.result
        var byteString = atob(dataURL.split(',')[1])
        var binary = new BinaryFile(byteString, 0, byteString.length)
        var exif = EXIF.readFromBinaryFile(binary)

        var img = new Image()
        img.onload = function (e) {
          var orientation = exif['Orientation'] || 1
          orientation = methods.rotate(orientation, $this.options.rotate)

          // CW or CCW ? replace width and height
          var size =
            orientation >= 5 && orientation <= 8
              ? methods.newsize(
                  img.height,
                  img.width,
                  $this.options.width,
                  $this.options.height,
                  $this.options.crop
                )
              : methods.newsize(
                  img.width,
                  img.height,
                  $this.options.width,
                  $this.options.height,
                  $this.options.crop
                )

          var iw = img.width,
            ih = img.height
          var width = size.width,
            height = size.height

          var canvas = document.createElement('canvas')
          var ctx = canvas.getContext('2d')
          ctx.save()
          methods.transformCoordinate(canvas, width, height, orientation)

          // over image size
          if (methods.detectSubsampling(img)) {
            iw /= 2
            ih /= 2
          }
          var d = 1024 // size of tiling canvas
          var tmpCanvas = document.createElement('canvas')
          tmpCanvas.width = tmpCanvas.height = d
          var tmpCtx = tmpCanvas.getContext('2d')
          var vertSquashRatio = methods.detectVerticalSquash(img, iw, ih)
          var sy = 0
          while (sy < ih) {
            var sh = sy + d > ih ? ih - sy : d
            var sx = 0
            while (sx < iw) {
              var sw = sx + d > iw ? iw - sx : d
              tmpCtx.clearRect(0, 0, d, d)
              tmpCtx.drawImage(img, -sx, -sy)
              var dx = Math.floor(sx * width / iw)
              var dw = Math.ceil(sw * width / iw)
              var dy = Math.floor(sy * height / ih / vertSquashRatio)
              var dh = Math.ceil(sh * height / ih / vertSquashRatio)
              ctx.drawImage(tmpCanvas, 0, 0, sw, sh, dx, dy, dw, dh)
              sx += d
            }
            sy += d
          }
          ctx.restore()
          tmpCanvas = tmpCtx = null

          // if rotated width and height data replacing issue
          var newcanvas = document.createElement('canvas')
          newcanvas.width = size.cropped === 'h' ? height : width
          newcanvas.height = size.cropped === 'w' ? width : height
          var x = size.cropped === 'h' ? (height - width) * 0.5 : 0
          var y = size.cropped === 'w' ? (width - height) * 0.5 : 0
          var newctx = newcanvas.getContext('2d')
          newctx.drawImage(canvas, x, y, width, height)

          // console.log(file, file.type);
          if (file.type === 'image/png') {
            var data = newcanvas.toDataURL(file.type)
          } else {
            var data = newcanvas.toDataURL(
              'image/jpeg',
              $this.options.quality * 0.01
            )
          }

          // CALLBACK
          $this.options.callback(data, newcanvas.width, newcanvas.height)

          // });
        }
        img.src = dataURL
        // =====================================================
      }
      reader.readAsDataURL(file)
      // reader.readAsBinaryString(file);
    }
  }

  function Plugin (file, options) {
    this.file = file
    // EXTEND
    this.options = methods.extend({}, defaults, options)
    this._defaults = defaults
    this._name = pluginName
    this.init()
  }

  if (typeof file === 'string') {
    return methods[file](options)
  } else {
    // eslint-disable-next-line no-new
    new Plugin(file, options)
  }
}
/* eslint-enable */
