import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useProfile } from '../../context/ProfileContext';

const FormContainer = styled.div`
  padding: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${props => props.$hasError ? '#cc0000' : '#ccc'};
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#cc0000' : '#0066cc'};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${props => props.$hasError ? '#cc0000' : '#ccc'};
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#cc0000' : '#0066cc'};
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #0052a3;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: #cc0000;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const PhotoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const PhotoPreview = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #0066cc;
`;

const PhotoUploadContainer = styled.div`
  flex: 1;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputButton = styled.button`
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #e0e0e0;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ReadOnlyInput = styled.div`
  padding: 0.5rem;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  font-weight: 500;
`;

const DeleteButton = styled.button`
  padding: 0.25rem 0.5rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  margin-left: 0.5rem;
  
  &:hover {
    background: #c82333;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const EditProfileForm = ({ user, onCancel, onUpdate }) => {
  const { updateUserProfile, uploadProfilePhoto, deleteProfilePhoto } = useProfile();
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    bio: user?.bio || ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user?.profilePhotoUrl || null);
  const [photoUploading, setPhotoUploading] = useState(false);

  // Cleanup blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (photoPreview && photoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          photo: 'Please select an image file'
        }));
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          photo: 'Image size must be less than 5MB'
        }));
        return;
      }
      
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      
      // Clear photo error
      if (errors.photo) {
        setErrors(prev => ({
          ...prev,
          photo: ''
        }));
      }
    }
  };

  const handleDeletePhoto = async () => {
    if (!user?.profilePhotoUrl && !photoFile) return;
    
    setPhotoUploading(true);
    setErrors(prev => ({ ...prev, photo: '' }));
    
    try {
      const result = await deleteProfilePhoto();
      
      if (!result.success) {
        setErrors(prev => ({
          ...prev,
          photo: result.error
        }));
      } else {
        // Clear photo preview and file
        setPhotoPreview(null);
        setPhotoFile(null);
        // Notify parent component of the update
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        photo: 'Failed to delete photo'
      }));
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Upload photo first if there's a new one
      if (photoFile) {
        setPhotoUploading(true);
        const photoResult = await uploadProfilePhoto(photoFile);
        
        if (!photoResult.success) {
          setErrors({
            photo: photoResult.error
          });
          setPhotoUploading(false);
          setLoading(false);
          return;
        }
        setPhotoUploading(false);
        // Notify parent component of photo update
        if (onUpdate) onUpdate();
      }
      
      // Update profile details
      const result = await updateUserProfile(formData);
      
      if (result.success) {
        // Success - notify parent component to trigger rerender
        if (onUpdate) onUpdate();
        if (onCancel) onCancel();
      } else {
        setErrors({
          displayName: result.field === 'displayName' ? result.error : '',
          bio: result.field === 'bio' ? result.error : ''
        });
      }
    } catch (error) {
      setErrors({
        displayName: 'An unexpected error occurred',
        bio: 'An unexpected error occurred'
      });
    } finally {
      setLoading(false);
      setPhotoUploading(false);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Username</Label>
          <ReadOnlyInput>{user?.username || ''}</ReadOnlyInput>
        </FormGroup>
        
        <FormGroup>
          <Label>Profile Photo</Label>
          <PhotoContainer>
            <PhotoPreview 
              src={photoPreview || '/default-avatar.svg'} 
              alt="Profile preview"
            />
            <PhotoUploadContainer>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <FileInputButton 
                  type="button" 
                  onClick={() => document.getElementById('photo-upload').click()}
                  disabled={loading || photoUploading}
                >
                  {photoUploading ? 'Uploading...' : 'Choose Photo'}
                </FileInputButton>
                {(user?.profilePhotoUrl || photoFile) && (
                  <DeleteButton
                    type="button"
                    onClick={handleDeletePhoto}
                    disabled={loading || photoUploading}
                  >
                    Delete
                  </DeleteButton>
                )}
              </div>
              <FileInput
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                disabled={loading || photoUploading}
              />
              {photoFile && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                  Selected: {photoFile.name}
                </div>
              )}
            </PhotoUploadContainer>
          </PhotoContainer>
          {errors.photo && <ErrorMessage>{errors.photo}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Label>Display Name</Label>
          <Input
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            $hasError={!!errors.displayName}
            disabled={loading}
          />
          {errors.displayName && <ErrorMessage>{errors.displayName}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Label>Bio</Label>
          <TextArea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            $hasError={!!errors.bio}
            disabled={loading}
          />
          {errors.bio && <ErrorMessage>{errors.bio}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </FormGroup>
        
        <FormGroup>
          <Button type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
        </FormGroup>
      </form>
    </FormContainer>
  );
};

export default EditProfileForm;
