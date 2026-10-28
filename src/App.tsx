import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import Layout from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home/Home'));
const Profil = lazy(() => import('./pages/Profil/Profil'));
const VisiMisi = lazy(() => import('./pages/VisiMisi/VisiMisi'));
const Program = lazy(() => import('./pages/Program/Program'));
const Guru = lazy(() => import('./pages/Guru/Guru'));
const Fasilitas = lazy(() => import('./pages/Fasilitas/Fasilitas'));
const Berita = lazy(() => import('./pages/Berita/Berita'));
const Galeri = lazy(() => import('./pages/Galeri/Galeri'));
const PPDB = lazy(() => import('./pages/PPDB/PPDB'));
const Kontak = lazy(() => import('./pages/Kontak/Kontak'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="profil" element={<Profil />} />
            <Route path="visi-misi" element={<VisiMisi />} />
            <Route path="program" element={<Program />} />
            <Route path="program/:slug" element={<Program />} />
            <Route path="guru" element={<Guru />} />
            <Route path="fasilitas" element={<Fasilitas />} />
            <Route path="berita" element={<Berita />} />
            <Route path="berita/:slug" element={<Berita />} />
            <Route path="galeri" element={<Galeri />} />
            <Route path="ppdb" element={<PPDB />} />
            <Route path="kontak" element={<Kontak />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}
