import { createSignal, Show } from "solid-js";
import { A } from "@solidjs/router";
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
  Search,
} from "lucide-solid";
import NavLink from "../components/NavLink";
import FooterLink from "../components/FooterLink";
import { useAuth } from "../context/AuthContext";
function MainLayout(props) {
  const [isActive, setIsActive] = createSignal(false);
  const { user } = useAuth();
  const closeMenu = () => setIsActive(false);
  const toggleMenu = () => setIsActive((active) => !active);
  return (
    <div class="is-flex is-flex-direction-column is-min-height-100vh bg-dark text-light">
      <nav
        class="navbar is-fixed-top"
        role="navigation"
        aria-label="Main navigation"
      >
        <div class="container">
          <div class="navbar-brand">
            <A
              class="navbar-item has-text-weight-bold is-size-4"
              href="/"
              onClick={closeMenu}
            >
              <span class="icon text-purple mr-2">
                <BookOpen size={20} />
              </span>
              <span>TaleVault</span>
            </A>
            <button
              class={`navbar-burger ${isActive() ? "is-active" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle navigation"
              aria-expanded={isActive()}
            >
              <Menu />
            </button>
          </div>
          <div class={`navbar-menu ${isActive() ? "is-active" : ""}`}>
            <Show when={user()}>
              <div class="navbar-start is-flex-grow-1 is-justify-content-center">
                <div class="navbar-item">
                  <form
                    class="field has-addons search-navbar-form mb-0"
                    role="search"
                    action="/app/explore"
                  >
                    <div class="control has-icons-left is-expanded">
                      <input
                        class="input bg-dark text-light search-navbar-input"
                        type="search"
                        name="query"
                        placeholder="Search stories..."
                        aria-label="Search stories"
                      />
                      <span class="icon is-small is-left">
                        <Search size={16} />
                      </span>
                    </div>
                    <div class="control">
                      <button class="button is-purple" type="submit">
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Show>
            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <NavLink
                    href="/"
                    onClick={closeMenu}
                    icon={<House size={16} />}
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
                      href={`/profile/${user().id}`}
                      onClick={closeMenu}
                      icon={<User size={16} />}
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      href="/auth/logout"
                      onClick={closeMenu}
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
      <main class="section is-flex-grow-1 mt-6">
        <div class="container">{props.children}</div>
      </main>
      <footer class="footer bg-darker text-light-ter border-top-dark py-6 mt-auto">
        <div class="container">
          <div class="columns is-multiline">
            <div class="column is-6-tablet">
              <A
                class="is-flex is-align-items-center mb-3 has-text-weight-bold is-size-5 text-light"
                href="/"
              >
                <span class="icon text-purple mr-2">
                  <BookOpen size={20} />
                </span>
                <span>TaleVault</span>
              </A>
              <p class="is-size-7">
                Free, open source, ethical platform for readers and writers.
              </p>
            </div>
            <div class="column is-3-tablet">
              <p class="menu-label text-light has-text-weight-semibold">
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
            <div class="column is-3-tablet">
              <p class="menu-label text-light has-text-weight-semibold">
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
          <div class="has-text-centered is-size-7">
            <p class="is-flex is-align-items-center is-justify-content-center">
              Created with <Heart size={14} class="text-purple mx-1" /> by
              sch0fer
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default MainLayout;
