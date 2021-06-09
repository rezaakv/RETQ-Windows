from ctypes import cast, POINTER
from comtypes import CLSCTX_ALL
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume, ISimpleAudioVolume
import sys

def getCurrentMasterVolume(volume):
    return int(round(volume.GetMasterVolumeLevelScalar() * 100))

def flushStdAndExit():
    sys.stdout.flush()
    sys.exit()

def main():
    if(len(sys.argv) != 2):
        print("Only 1 argument allowed and also needed")
        flushStdAndExit()
    target_volume: int = int(sys.argv[1])
    if(int(sys.argv[1]) > 100 or int(sys.argv[1]) < 0):
        print("Arg must be Integer [0,100]")
        flushStdAndExit()    
    devices = AudioUtilities.GetSpeakers()
    interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
    volume = cast(interface, POINTER(IAudioEndpointVolume))

    print(getCurrentMasterVolume(volume))
    volume.SetMasterVolumeLevelScalar(target_volume/100, None)
    print(getCurrentMasterVolume(volume))
    sys.stdout.flush()

if __name__ == "__main__":
    main()