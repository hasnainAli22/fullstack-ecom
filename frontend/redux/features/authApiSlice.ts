import { apiSlice } from '../services/apiSlice'

export interface User {
  first_name: string
  last_name: string
  email: string
}

interface SocialAuthArgs {
  provider: string
  state: string
  code: string
}

interface CreateUserResponse {
  success: boolean
  user: User
}

export type Address = {
  id: number
  user: string
  default_billing: boolean
  default_shipping: boolean
  city: string
  street: string
  landmark: string
  postal_code: string
  address_type: 'home' | 'office'
  phone_number: string
  created_at: string
  updated_at: string
}

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveUser: builder.query<User, void>({
      query: () => '/users/me/',
    }),
    retrieveUserAddresses: builder.query<any, void>({
      query: () => '/addresses/',
    }),
    // Retrieve the default shipping address
    retrieveDefaultShippingAddress: builder.query<any, void>({
      query: () => '/addresses/default-shipping/',
    }),
    // Add a new address
    addUserAddress: builder.mutation<any, Partial<Address>>({
      query: (newAddress) => ({
        url: '/addresses/add/',
        method: 'POST',
        body: newAddress,
      }),
    }),
    // Update an existing address
    updateUserAddress: builder.mutation<
      any,
      { id: number; address: Partial<Address> }
    >({
      query: ({ id, address }) => ({
        url: `/addresses/update/${id}/`,
        method: 'PUT',
        body: address,
      }),
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `addresses/${id}/delete/`,
        method: 'DELETE',
      }),
    }),
    socialAuthenticate: builder.mutation<CreateUserResponse, SocialAuthArgs>({
      query: ({ provider, state, code }) => ({
        url: `/o/${provider}/?state=${encodeURIComponent(
          state
        )}&code=${encodeURIComponent(code)}`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/jwt/create/',
        method: 'POST',
        body: { email, password },
      }),
    }),
    register: builder.mutation({
      query: ({ first_name, last_name, email, password, re_password }) => ({
        url: '/users/',
        method: 'POST',
        body: { first_name, last_name, email, password, re_password },
      }),
    }),
    verify: builder.mutation({
      query: () => ({
        url: '/jwt/verify/',
        method: 'POST',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout/',
        method: 'POST',
      }),
    }),
    activation: builder.mutation({
      query: ({ uid, token }) => ({
        url: '/users/activation/',
        method: 'POST',
        body: { uid, token },
      }),
    }),
    resetPassword: builder.mutation({
      query: (email) => ({
        url: '/users/reset_password/',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPasswordConfirm: builder.mutation({
      query: ({ uid, token, new_password, re_new_password }) => ({
        url: '/users/reset_password_confirm/',
        method: 'POST',
        body: { uid, token, new_password, re_new_password },
      }),
    }),
  }),
})

export const {
  useRetrieveUserQuery,
  useRetrieveUserAddressesQuery,
  useRetrieveDefaultShippingAddressQuery,
  useAddUserAddressMutation,
  useUpdateUserAddressMutation,
  useDeleteAddressMutation,
  useSocialAuthenticateMutation,
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useLogoutMutation,
  useActivationMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
} = authApiSlice
