import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowUpRight, CheckCircle2, FlaskConical } from 'lucide-react';

function createSchema(registration: boolean) {
  return z
    .object({
      name: z
        .string()
        .trim()
        .min(2, 'Nama minimal 2 karakter.')
        .max(100, 'Nama maksimal 100 karakter.'),
      email: z.email('Masukkan alamat email yang valid.').max(200),
      phone: z
        .string()
        .trim()
        .regex(
          /^[+\d\s()-]{8,20}$/,
          'Masukkan nomor telepon dengan 8 hingga 20 karakter yang valid.',
        )
        .refine(
          (value) => (value.match(/\d/g) ?? []).length >= 8,
          'Nomor telepon harus berisi minimal 8 digit.',
        ),
      studentName: z.string().trim().max(100).optional(),
      message: z.string().trim().max(2000, 'Pesan maksimal 2.000 karakter.').optional(),
      consent: z
        .boolean()
        .refine((value) => value, 'Konfirmasikan bahwa Anda memahami ini formulir demo.'),
    })
    .superRefine((data, context) => {
      if (registration && (!data.studentName || data.studentName.length < 2))
        context.addIssue({
          code: 'custom',
          path: ['studentName'],
          message: 'Nama calon siswa minimal 2 karakter.',
        });
      if (!registration && (!data.message || data.message.length < 10))
        context.addIssue({
          code: 'custom',
          path: ['message'],
          message: 'Pesan minimal 10 karakter.',
        });
    });
}

type FormValues = z.infer<ReturnType<typeof createSchema>>;

export default function DemoForm({ registration = false }: { registration?: boolean }) {
  const [validated, setValidated] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(createSchema(registration)),
    defaultValues: { name: '', email: '', phone: '', studentName: '', message: '', consent: false },
  });
  const prefix = registration ? 'ppdb' : 'contact';
  function field(name: keyof FormValues, label: string, type = 'text', placeholder = '') {
    return (
      <div className="form-field">
        <label htmlFor={`${prefix}-${name}`}>
          {label} <span>*</span>
        </label>
        <input
          id={`${prefix}-${name}`}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          autoComplete="off"
          aria-required="true"
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${prefix}-${name}-error` : undefined}
        />
        {errors[name] && (
          <p id={`${prefix}-${name}-error`} className="field-error">
            {errors[name]?.message}
          </p>
        )}
      </div>
    );
  }
  return (
    <div className="form-card">
      <span className="eyebrow">
        <FlaskConical size={17} />
        SIMULASI FORMULIR
      </span>
      <h2>{registration ? 'Kenali formulir pendaftaran.' : 'Tulis pesan percobaan.'}</h2>
      <p className="form-description">
        Ini adalah formulir demo. Gunakan data fiktif. Data hanya diperiksa di perangkat Anda, tidak
        disimpan dan tidak dikirim ke sekolah.
      </p>
      <form
        noValidate
        onSubmit={handleSubmit(() => setValidated(true))}
        onChange={() => setValidated(false)}
      >
        <div className="form-grid">
          {field(
            'name',
            registration ? 'Nama orang tua / wali' : 'Nama Anda',
            'text',
            'Nama contoh',
          )}
          {field('email', 'Alamat email', 'email', 'contoh@email.com')}
          {field('phone', 'Nomor telepon', 'tel', '080000000000')}
          {registration && field('studentName', 'Nama calon siswa', 'text', 'Nama siswa contoh')}
        </div>
        <div className="form-field">
          <label htmlFor={`${prefix}-message`}>
            {registration ? 'Pertanyaan (opsional)' : 'Pesan'}
            {!registration && <span> *</span>}
          </label>
          <textarea
            id={`${prefix}-message`}
            rows={4}
            placeholder="Tulis pertanyaan Anda…"
            {...register('message')}
            aria-required={!registration}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? `${prefix}-message-error` : undefined}
          />
          {errors.message && (
            <p className="field-error" id={`${prefix}-message-error`}>
              {errors.message.message}
            </p>
          )}
        </div>
        <div className="consent-field">
          <label htmlFor={`${prefix}-consent`}>
            <input
              type="checkbox"
              id={`${prefix}-consent`}
              {...register('consent')}
              aria-required="true"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? `${prefix}-consent-error` : undefined}
            />
            <span>
              Saya memahami ini hanya demo dan bukan{' '}
              {registration ? 'pendaftaran resmi' : 'pengiriman pesan ke sekolah'}.
            </span>
          </label>
          {errors.consent && (
            <p className="field-error" id={`${prefix}-consent-error`}>
              {errors.consent.message}
            </p>
          )}
        </div>
        <button className="button button-primary" type="submit">
          Periksa formulir demo <ArrowUpRight size={18} />
        </button>
        {validated && (
          <div className="form-success" role="status">
            <CheckCircle2 size={22} />
            <div>
              <strong>Format data valid.</strong>
              <p>
                Simulasi selesai. Data tidak disimpan atau dikirim.{' '}
                {registration
                  ? 'Anda belum terdaftar sebagai calon siswa.'
                  : 'Sekolah belum menerima pesan Anda.'}
              </p>
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  reset();
                  setValidated(false);
                }}
              >
                Bersihkan formulir
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
