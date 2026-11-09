import sakiraNobg from '@/assets/images/auth/sakira_nobg.png';
import avatar1 from '@/assets/images/auth/avatar.png';
import avatar2Img from '@/assets/images/auth/avatar2.png';
import avatar3Img from '@/assets/images/auth/avatar3.png';
import avatar4Img from '@/assets/images/auth/avatar4.png';
import avatar5Img from '@/assets/images/auth/avatar5.png';

export function Avatar({ src, alt, className = '', ...props }) {
    return (
        <img
            src={src}
            alt={alt}
            className={`absolute h-14 w-14 rounded-full object-cover ring-3 ring-white bg-white flex-shrink-0 ${className}`}
            {...props}
        />
    );
}

export default function AuthSideThree({ className = '' }) {
    return (
        <div className={`w-full max-w-[40rem] text-white flex flex-col select-none ${className}`}>
            <div className="relative w-full">
                <div className="relative flex">
                    {/* Character */}
                    <div className="relative z-1 w-[50%] shrink-0 -mb-3">
                        <img
                            src={sakiraNobg}
                            alt="Sakira"
                            className="block h-auto w-full object-contain"
                        />
                    </div>

                    {/* Avatars */}
                    <div className="relative z-20 flex min-w-0 flex-1 flex-col items-start mt-5">
                        <div className="flex items-start justify-start -space-x-2 sm:-space-x-3">
                            <Avatar src={avatar1} alt="Avatar 1" className="relative z-[5]" />
                            <Avatar src={avatar2Img} alt="Avatar 2" className="relative z-[4]" />
                            <Avatar src={avatar3Img} alt="Avatar 3" className="relative z-[3]" />
                            <Avatar src={avatar4Img} alt="Avatar 4" className="relative z-[2]" />
                            <Avatar src={avatar5Img} alt="Avatar 5" className="relative z-[1]" />
                        </div>

                        <p className="mt-3 text-left text-xs font-medium leading-snug sm:text-sm md:text-base">
                            5+ Anak Istimewa Terdampingi
                        </p>
                    </div>
                </div>

                {/* White line */}
                <div className="relative z-2 h-1 w-full rounded-full bg-white sm:h-[5px] md:h-[6px]" />
            </div>

            <div className=" x-auto mt-4 sm:mt-5 md:mt-6">
                <h3 className="max-w-[35rem] mx-auto mt-3 font-bold leading-snug sm:mt-4 text-2xl text-center">
                    Pendampingan Tepat untuk Setiap Langkah Istimewa Anak
                </h3>
                <p className="text-center text-sm font-normal leading-relaxed mt-2">
                    Hubungkan anak dengan Guru Pendamping Khusus (GPK) berpengalaman untuk mendukung tumbuh kembang dan kemandirian belajar secara optimal.
                </p>
            </div>
        </div>
    )
}
