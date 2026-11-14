import { useRef, useState } from 'react';
import SectionCard from './SectionCard';
import { formatFileSize } from '../data/catatanHarian';
import { icons } from '../../../assets/icons/icons';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png'];
const MAX_FILES = 5;
const MAX_SIZE = 5 * 1024 * 1024;

export default function DocumentationSection({ files = [], requiredError, onFilesChange, onRemoveFile }) {
    const inputRef = useRef(null);
    const [error, setError] = useState('');

    const handleSelect = (event) => {
        const incoming = Array.from(event.target.files ?? []);
        const messages = [];
        const accepted = [];
        const remaining = MAX_FILES - files.length;

        incoming.forEach((file) => {
            if (!ACCEPTED_TYPES.includes(file.type)) {
                messages.push(`${file.name}: format harus JPG atau PNG.`);
                return;
            }

            if (file.size > MAX_SIZE) {
                messages.push(`${file.name}: ukuran melebihi 5MB.`);
                return;
            }

            if (accepted.length >= remaining) {
                messages.push(`Maksimal ${MAX_FILES} berkas dokumentasi.`);
                return;
            }

            accepted.push({
                id: `upload-${file.name}-${Date.now()}-${accepted.length}`,
                name: file.name.replace(/\.[^.]+$/, ''),
                originalName: file.name,
                sizeBytes: file.size,
                size: formatFileSize(file.size),
                type: file.type,
                file,
                status: 'Unggah Selesai',
                thumbnail: URL.createObjectURL(file),
                isDemo: false,
            });
        });

        if (accepted.length > 0) {
            onFilesChange([...files, ...accepted]);
        }

        setError(messages[0] ?? '');
        event.target.value = '';
    };

    return (
        <SectionCard
            title="Dokumentasi Foto & Karya Siswa"
            instruction="Maksimal 5 berkas (JPG/PNG, maks. 5MB)"
        >
            <div className="flex flex-col gap-5">
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    multiple
                    onChange={handleSelect}
                    className="hidden"
                />

                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={files.length >= MAX_FILES}
                    className={`flex min-h-[126px] w-full items-center justify-center gap-5 rounded-3xl bg-white px-4 py-4 text-left shadow-[0_0_2px_rgba(0,0,0,0.08)] transition hover:bg-white-light-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-normal/40 disabled:cursor-not-allowed disabled:opacity-60 ${requiredError ? 'ring-2 ring-red-normal/70' : ''}`}
                >
                    <span className="text-base text-black-normal">
                        Unggah Foto lembar kerja, hasil prakarya, atau foto
                        observasi posisi belajar siswa
                    </span>
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[34px] bg-[#E1E1E1]">
                        <img
                            src={icons.upload}
                            alt=""
                            aria-hidden="true"
                            className="h-[42px] w-[42px]"
                        />
                    </span>
                </button>

                {error && <p className="text-xs text-red-normal">{error}</p>}
                {requiredError && <p className="text-xs text-red-normal">{requiredError}</p>}

                {files.length > 0 && (
                    <ul className="flex flex-wrap gap-3">
                        {files.map((file) => (
                            <li
                                key={file.id}
                                className="flex items-center gap-4 rounded-3xl bg-white px-3 py-5 shadow-[0_0_2px_rgba(0,0,0,0.08)]"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={file.thumbnail}
                                        alt=""
                                        className="h-16 w-[70px] shrink-0 rounded-xl object-cover"
                                    />

                                    <div className="flex w-[168px] min-w-0 flex-col gap-2">
                                        <p className="truncate text-base text-black-normal">
                                            {file.name}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className="shrink-0 text-xs text-white-dark">
                                                {file.size} &bull;
                                            </span>
                                            <span className="rounded-3xl bg-green-normal px-2.5 py-1 text-xs font-semibold text-white">
                                                {file.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => onRemoveFile(file)}
                                    aria-label={`Hapus ${file.name}`}
                                    className="shrink-0 rounded-full p-1 transition hover:bg-red-light focus:outline-none focus-visible:ring-2 focus-visible:ring-red-normal/40"
                                >
                                    <img
                                        src={icons.trash}
                                        alt=""
                                        aria-hidden="true"
                                        className="h-7 w-7"
                                    />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </SectionCard>
    );
}
