import React from 'react'

function Footer() {
  return (
    <>
  <footer className="hidden md:block  bg-gray-900 text-white text-center py-4 mt-auto md:ml-64 md:mr-64">
    <div className="container px-4 mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
      <div className="flex items-center gap-2 mb-4 md:mb-0">
      <img src='https://midwestitstore.com.np/wp-content/uploads/2024/09/logo-1.png'  className="w-32 h-16" alt="Logo" />
      <h2 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600 tracking-widest">MidWest IT Store</h2>
      </div>

      <div className="flex gap-4 mb-4 md:mb-0">
      <a href="#" className="hover:text-violet-400 transition"><i className="fab fa-discord"></i></a>
      <a href="#" className="hover:text-violet-400 transition"><i className="fab fa-twitter"></i></a>
      <a href="#" className="hover:text-violet-400 transition"><i className="fab fa-instagram"></i></a>
      <a href="#" className="hover:text-violet-400 transition"><i className="fab fa-youtube"></i></a>
      </div>

      <div className="flex gap-4">
      <a href="#" className="hover:text-violet-400 transition">About</a>
      <a href="#" className="hover:text-violet-400 transition">Contact</a>
      <a href="#" className="hover:text-violet-400 transition">Privacy</a>
      <a href="#" className="hover:text-violet-400 transition">Terms</a>
      </div>
    </div>

    <p className="mt-4">© 2025 MidWest IT Store — Built for selling latest product in cheap price with free delivery. <br /></p>
    </div>
  </footer>
    </>
  )
}

export default Footer;