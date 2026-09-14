import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { useNavigate } from "@solidjs/router";
import {
  Menu,
  House,
  BookOpen,
  MessageSquare,
  Code,
  Heart,
  UserPlus,
  LogIn,
  LogOut,
  ShieldCheck,
  FileText,
  User,
} from "lucide-solid";

import NavLink from "../components/NavLink";
import FooterLink from "../components/FooterLink";

import { supabase } from "../utils/supabase";
import { useAuth } from "../context/AuthContext";

function MainLayout(props) {
  const [isActive, setIsActive] = createSignal(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsActive(!isActive());
  const closeMenu = () => setIsActive(false);

  const handleSignOut = async () => {
    closeMenu();
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div class="is-flex is-flex-direction-column min-h-screen bg-dark text-light">
      <nav
        class="navbar is-dark is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="container">
          <div class="navbar-brand">
            <A
              class="navbar-item font-weight-bold is-size-4"
              href="/"
              onClick={closeMenu}
            >
              <span class="icon text-purple mr-2">
                <BookOpen size={20} />
              </span>
              <span>TaleVault</span>
            </A>

            <button
              onClick={toggleMenu}
              class={`navbar-burger burger ${isActive() ? "is-active" : ""}`}
              aria-label="menu"
              aria-expanded={isActive()}
            >
              <Menu />
            </button>
          </div>

          <div class={`navbar-menu ${isActive() ? "is-active" : ""}`}>
            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <NavLink
                    href="/"
                    onClick={closeMenu}
                    icon={<House sie={16} />}
                  >
                    Home
                  </NavLink>
                  <Show
                    when={user()}
                    fallback={
                      <>
                        <NavLink
                          href="/auth/sign-up"
                          onClick={closeMenu}
                          icon={<UserPlus size={16} />}
                        >
                          Sign up
                        </NavLink>
                        <NavLink
                          href="/auth/sign-in"
                          onClick={closeMenu}
                          icon={<LogIn size={16} />}
                        >
                          Sign in
                        </NavLink>
                      </>
                    }
                  >
                    <NavLink
                      href="/app/profile"
                      onClick={closeMenu}
                      icon={<User size={16} />}
                      class="is-danger"
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      href="/auth/logout"
                      onClick={handleSignOut}
                      icon={<LogOut size={16} />}
                    >
                      Logout
                    </NavLink>
                  </Show>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main class="section flex-grow-1 my-6">
        <div class="container">{props.children}</div>
      </main>

      <footer class="footer bg-darker text-light-ter border-top-dark py-6 mt-auto">
        <div class="container">
          <div class="columns is-multiline">
            <div class="column is-6-tablet is-6-desktop">
              <A
                class="is-flex is-align-items-center mb-3 text-light font-weight-bold is-size-5"
                href="/"
              >
                <span class="icon text-purple mr-2">
                  <BookOpen size={20} />
                </span>
                <span>TaleVault</span>
              </A>
              <p class="is-size-7 max-w-sm">
                Free, open source, ethical platform for readers and writers.
              </p>
            </div>

            <div class="column is-3-tablet is-3-desktop">
              <p class="menu-label text-light font-weight-semibold">
                About & Legal
              </p>
              <ul class="menu-list">
                <FooterLink icon={<ShieldCheck size={16} />} href="#">
                  Privacy Policy
                </FooterLink>
                <FooterLink icon={<FileText size={16} />} href="#">
                  Terms of Service
                </FooterLink>
              </ul>
            </div>

            <div class="column is-3-tablet is-3-desktop">
              <p class="menu-label text-light font-weight-semibold">
                Community
              </p>
              <ul class="menu-list">
                <FooterLink href="#" icon={<MessageSquare size={16} />}>
                  Discord
                </FooterLink>
                <FooterLink href="#" icon={<Code size={16} />}>
                  GitHub
                </FooterLink>
              </ul>
            </div>
          </div>

          <hr class="has-background-grey-darker my-5" />

          <div class="has-text-centered is-size-7 text-light-ter">
            <p class="is-flex is-align-items-center is-justify-content-center gap-1">
              Created with <Heart size={14} class="text-purple" /> by sch0fer
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
