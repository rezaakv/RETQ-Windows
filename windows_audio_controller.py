from ctypes import cast, POINTER
from comtypes import CLSCTX_ALL
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume, ISimpleAudioVolume
import sys

def getCurrentMasterVolume(volume):
    return int(round(volume.GetMasterVolumeLevelScalar() * 100))

def main():
    if(len(sys.argv) != 2):
        raise Exception("Only 1 argument allowed and also needed")
    target_volume: int = int(sys.argv[1])
    if(int(sys.argv[1]) > 100 or int(sys.argv[1]) < 0):
        raise Exception("Arg must be Integer [0,100]")        
    devices = AudioUtilities.GetSpeakers()
    interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
    volume = cast(interface, POINTER(IAudioEndpointVolume))

    print(getCurrentMasterVolume(volume))
    volume.SetMasterVolumeLevelScalar(target_volume/100, None)
    print(getCurrentMasterVolume(volume))

if __name__ == "__main__":
    main()